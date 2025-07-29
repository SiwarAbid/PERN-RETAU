import { useState, useEffect } from 'react';
import LoyaltyCard from '../components/client-view/loyality/LoyalityCard';
import RewardWheel from '../components/client-view/loyality/RewardWheel';
// import PointsManager from '../components/client-view/loyality/PointsManager';
import RewardModal from '../components/client-view/loyality/RewardModal';
import type { User } from '../types/accueil';
import DataLoadingState from '../components/Loading';
import CustomerForm from '../components/client-view/loyality/ProfilForm';


function LoyaltyPage() {
  // const [customerData, setCustomerData] = useState<User | null>(null);
  const [showWheel, setShowWheel] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string>('');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const customerData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as User : null;

  // Récupérer l'utilisateur et ses points depuis le back
  useEffect(() => {
    // if (savedData) {
    //   setCustomerData(JSON.parse(savedData));
    // }
        async function fetchUser() {
      const res = await fetch('/api/user/me'); // à adapter selon votre route
      const user: User = await res.json();

      // Récupérer les points de fidélité
      const resPoints = await fetch(`/api/loyality/${user.id}`);
      const { points } = await resPoints.json();
      console.log('User data:', user);
      console.log('Points:', points);

    }
    fetchUser();
  }, []);

  // Sauvegarder les données dans localStorage
  const saveCustomerData = (data: User) => {
    // setCustomerData(data);
    localStorage.setItem('user', JSON.stringify(data));
  };



  // const handleAddPoints = () => {
  //   if (customerData) {
  //     const newData = { ...customerData, points: (customerData.points || 0) + 10 };
  //     saveCustomerData(newData);
  //   }
  // };

  // const handleUsePoints = () => {
  //   if (customerData && (customerData.points || 0) >= 100) {
  //     setShowWheel(true);
  //   }
  // };

  const handleRewardSelected = (reward: string) => {
    if (customerData) {
      const newData = { ...customerData, points: (customerData.points || 0) - 100 };
      saveCustomerData(newData);
      setSelectedReward(reward);
      setShowWheel(false);
      setShowRewardModal(true);
    }
  };

  return (
    <div className="min-h-screen pb-10 bg-gradient-to-br from-orange-50 via-yellow-50 to-rose-50">
      {customerData ? (
        <>
      <div className="flex p-20 ml-20 max-w-9xl gap-6 mt-6 mx-auto px-4">
        {showWheel ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Tournez la Roue de la Fortune !</h2>
            <div className="flex justify-center mb-8">
              <RewardWheel
                onRewardSelected={handleRewardSelected}
                disabled={false}
              />
            </div>
            <button
              onClick={() => setShowWheel(false)}
              className="text-orange-600 hover:text-orange-700 font-semibold underline"
            >
              Retour à ma carte
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Gestion des informations */}
            <div className="space-y-6">
              <CustomerForm />
            </div>
            {/* Carte de fidélité */}
            <div className="space-y-6 ml-10">
              <LoyaltyCard
                customerName={customerData.name}
                points={customerData.points ? customerData.points : 0}
              />
            </div>
          </div>
        )}
      </div>

      {/* Modal de récompense */}
      <RewardModal
        isOpen={showRewardModal}
        reward={selectedReward}
        onClose={() => setShowRewardModal(false)}
      />
      </>) : (
        <DataLoadingState isEmpty={false} isLoading={true} hasError={false} />
      )}
    </div>
  );
}

export default LoyaltyPage;