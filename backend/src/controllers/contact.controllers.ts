import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Créer un nouveau contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Nom, email, sujet et message requis' });
    }

    const contact = await prisma.contact.create({
      data: { name, email, subject, message }
    });
    res.status(201).json(contact);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer tous les contacts
export const getContacts = async (_req: Request, res: Response) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.json(contacts);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer un contact par ID
export const getContactById = async (req: Request, res: Response) => {
  try {
    const contact = await prisma.contact.findUnique({ where: { id: Number(req.params.id) } });
    if (!contact) return res.status(404).json({ error: 'Contact non trouvé' });
    res.json(contact);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un contact
export const updateContact = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const data: any = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (message) data.message = message;

    const contact = await prisma.contact.update({
      where: { id: Number(req.params.id) },
      data
    });
    res.json(contact);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un contact
export const deleteContact = async (req: Request, res: Response) => {
  try {
    await prisma.contact.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Contact supprimé' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


import nodemailer from 'nodemailer';


export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true si port = 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Restau SweetCorner" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('📧 Email envoyé:', info.messageId);
    return info;
  } catch (error: any) {
    console.error('❌ Erreur envoi mail:', error.message);
    throw new Error('Erreur lors de l’envoi de l’e-mail');
  }
};
