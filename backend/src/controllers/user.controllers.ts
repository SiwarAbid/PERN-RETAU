import { Request, Response } from 'express';
import { prisma } from '../prisma';
import { hashPassword } from '../utils/hash';
import { sendEmail } from './contact.controllers';
import { Role } from '@prisma/client'; // Ajout de l'import de l'enum
import { error } from 'console';

// Créer un nouvel utilisateur
export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("hello here  backend CREATE USER  ---")
    console.log("Here my body -- ", req.body);
    
    // On récupère tout le body, mais on extrait les champs principaux
    let { name, email, password, role, ...otherFields } = req.body;
    let ipassword;
    
    if (!email) return res.status(400).json({ error: 'Email requis' });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: 'Email déjà utilisé' });

    if (!name) name = email.split('@')[0].replace(/\d+/g, '');
    if (!password) {
      password = require('crypto').randomBytes(8).toString('hex');
      ipassword = password;
    }
    else {
      ipassword = password;
      password = await hashPassword(password);
      
    }

    if (!role) role = 'CLIENT';
    if (otherFields.isActived === 'true') otherFields.isActived = true;
    else if (otherFields.isActived === 'false') otherFields.isActived = false;

    if(otherFields.phone) otherFields.phone = otherFields.phone.replace(/\D/g, '');
    if(otherFields.salary) otherFields.salary = Number(otherFields.salary);
    if(otherFields.dateEmbauche) otherFields.dateEmbauche = new Date(otherFields.dateEmbauche);

    // On construit dynamiquement les données à insérer
    const userData: any = {
      name,
      email,
      password,
      role,
      ...otherFields 
    };
    console.log("userData --- ", userData)
    const user = await prisma.user.create({
      data: userData
    });
    console.log("User Added && mail en cours d'envoi ---")
    let subject = 'Bienvenue sur SweetCorner!';
    let text = `Bonjour ${name}, 
    Bienvenue sur notre plateforme.
    Nous sommes heureux de vous informer que vous avez été inscrit avec succès dans notre Plateforme SWEET CORNER
    Vos informations de connexion sont : 
    
    Email : ${email}
    Mot de passe : ${ipassword}
    
    Merci pour votre confiance.`
    sendEmail({to: email, subject: subject, text: text});
    console.log("User Added && mail envoyé ---")

    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les utilisateurs
export const getUsers = async (req: Request, res: Response) => {
  console.log('Full URL:', req.url);
  console.log('Query params:', req.query);

  try {
    const role = req.query.role as string | undefined;
    console.log('Role:', role);
    if (role) {
      // Vérification stricte de l'enum
      if (!Object.values(Role).includes(role as Role)) {
        console.log('Invalid role:', role);
        return res.status(400).json({ error: 'Role invalide' });
      }
      console.log('Role:', role);

      // Clients
        if (role === 'CLIENT') {
          let clients = await prisma.user.findMany({ where: { role: role as Role } });
          console.log('Clients:', clients);
          if (!clients || clients.length === 0) 
            return res.status(404).json({ error: 'Aucun utilisateur trouvé pour ce rôle' });
          res.json({ clients: clients });
        }
      // Employees
        else if (role === 'EMPLOYEE') {
          
          let employees = await prisma.user.findMany({
             where: {
              NOT: {
                role: 'CLIENT' as Role
              }
            } 
          });
          let users = await prisma.user.findMany();
          console.log('Users:', users);
          console.log('Employees:', employees);
          if (!employees || employees.length === 0) 
            return res.status(404).json({ error: 'Aucun employé trouvé' });
          res.json({ employees: employees });
        }
        else {
          let users = await prisma.user.findMany({ where: { role: role as Role } });
          console.log('Users:', users);
          if (!users || users.length === 0) 
            return res.status(404).json({error: `Aucun utilisateur trouvé pour ce rôle. ${role}`})
          res.json(users);
        }
      }
      // Without Role ( All users)
      else {
        let users = await prisma.user.findMany();
        console.log('Users:', users);
        if (!users || users.length === 0) 
          return res.status(404).json({ error: 'Aucun utilisateur trouvé' });
        res.json({ users: users });
      }

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }

};

// Récupérer un utilisateur par ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(req.params.id) } });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (req: Request, res: Response) => {
  try {
    console.log("hello here  backend uPDATE USER  ---")
    console.log("Here my body -- ", req.body);

    // On extrait le mot de passe pour le traiter à part, tout le reste est dynamique
    const { password, ...otherFields } = req.body;
    
    if (otherFields.isActived === 'true') otherFields.isActived = true;
    else if (otherFields.isActived === 'false') otherFields.isActived = false;

    if(otherFields.phone) otherFields.phone = otherFields.phone.replace(/\D/g, '');
    if(otherFields.salary) otherFields.salary = Number(otherFields.salary);
    if(otherFields.dateEmbauche) otherFields.dateEmbauche = new Date(otherFields.dateEmbauche);
    if(otherFields.role) otherFields.role = otherFields.role.toUpperCase()
    let data = { ...otherFields };

    // Si un mot de passe est fourni, on le hash avant de l'enregistrer
    if (password) {
      data.password = await hashPassword(password);
    }

    // Mise à jour dynamique de tous les champs reçus dans le body
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data :{
        role: data.role as Role,
        ...data
      }
    });

    res.json(user);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log("hello here  backend DELETE USER  ---")
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};