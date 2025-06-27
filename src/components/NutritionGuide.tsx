import React, { useState } from 'react';
import { 
  Utensils, 
  Apple, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Baby,
  Heart
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { NutritionPlan} from '../types';

const NutritionGuide: React.FC = () => {
  useApp();
  const [selectedStage, setSelectedStage] = useState('breastfeeding');
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');

  const stages = [
    { id: 'pregnancy', label: 'Pregnancy', icon: Heart },
    { id: 'breastfeeding', label: 'Breastfeeding', icon: Baby },
    { id: 'weaning', label: 'Weaning (6-12m)', icon: Apple },
    { id: 'toddler', label: 'Toddler (1-2y)', icon: Utensils }
  ];

  const nutritionPlans: { [key: string]: NutritionPlan } = {
    pregnancy: {
      stage: 'Pregnancy',
      meals: {
        breakfast: [
          { name: 'Upma with vegetables', quantity: '1 bowl', benefits: 'Rich in iron and folate', localName: 'उपमा' },
          { name: 'Milk with almonds', quantity: '1 glass', benefits: 'Calcium and protein', localName: 'बादाम वाला दूध' },
          { name: 'Banana', quantity: '1 medium', benefits: 'Potassium and vitamins', localName: 'केला' }
        ],
        lunch: [
          { name: 'Brown rice', quantity: '1 cup', benefits: 'Complex carbohydrates', localName: 'ब्राउन चावल' },
          { name: 'Dal with spinach', quantity: '1 bowl', benefits: 'Protein, iron, folate', localName: 'पालक दाल' },
          { name: 'Mixed vegetable curry', quantity: '1 bowl', benefits: 'Vitamins and minerals', localName: 'मिक्स सब्जी' }
        ],
        dinner: [
          { name: 'Roti with ghee', quantity: '2 pieces', benefits: 'Energy and healthy fats', localName: 'घी वाली रोटी' },
          { name: 'Chicken curry', quantity: '1 bowl', benefits: 'High-quality protein', localName: 'चिकन करी' },
          { name: 'Raita', quantity: '1 bowl', benefits: 'Probiotics and calcium', localName: 'रायता' }
        ],
        snacks: [
          { name: 'Dates with nuts', quantity: '3-4 pieces', benefits: 'Iron and energy', localName: 'खजूर' },
          { name: 'Buttermilk', quantity: '1 glass', benefits: 'Hydration and probiotics', localName: 'छाछ' }
        ]
      },
      guidelines: [
        'Increase calorie intake by 300-500 calories/day',
        'Take prenatal vitamins as prescribed',
        'Avoid alcohol, smoking, and raw foods',
        'Stay hydrated - drink 8-10 glasses of water daily'
      ]
    },
    breastfeeding: {
      stage: 'Breastfeeding Mother',
      meals: {
        breakfast: [
          { name: 'Oats porridge with milk', quantity: '1 bowl', benefits: 'Increases milk production', localName: 'दलिया' },
          { name: 'Fenugreek seeds tea', quantity: '1 cup', benefits: 'Boosts lactation', localName: 'मेथी का पानी' },
          { name: 'Mixed nuts', quantity: '1 handful', benefits: 'Healthy fats and protein', localName: 'मिक्स नट्स' }
        ],
        lunch: [
          { name: 'Rice with ghee', quantity: '1 cup', benefits: 'Energy for milk production', localName: 'घी चावल' },
          { name: 'Moong dal', quantity: '1 bowl', benefits: 'Easy to digest protein', localName: 'मूंग दाल' },
          { name: 'Bottle gourd curry', quantity: '1 bowl', benefits: 'Hydration and nutrients', localName: 'लौकी की सब्जी' }
        ],
        dinner: [
          { name: 'Khichdi with ghee', quantity: '1 bowl', benefits: 'Comfort food with nutrition', localName: 'खिचड़ी' },
          { name: 'Curd', quantity: '1 bowl', benefits: 'Probiotics and calcium', localName: 'दही' },
          { name: 'Warm milk with turmeric', quantity: '1 glass', benefits: 'Anti-inflammatory', localName: 'हल्दी वाला दूध' }
        ],
        snacks: [
          { name: 'Til laddu', quantity: '1 piece', benefits: 'Traditional lactation booster', localName: 'तिल के लड्डू' },
          { name: 'Fresh coconut water', quantity: '1 glass', benefits: 'Electrolytes and hydration', localName: 'नारियल पानी' }
        ]
      },
      guidelines: [
        'Increase daily calorie intake by 500 calories',
        'Drink fluids before and during breastfeeding',
        'Include galactagogue foods (oats, fennel, garlic)',
        'Avoid caffeine and alcohol completely'
      ]
    },
    weaning: {
      stage: 'Weaning Baby (6-12 months)',
      meals: {
        breakfast: [
          { name: 'Rice cereal', quantity: '2-3 tbsp', benefits: 'Easy first food', localName: 'चावल का दलिया' },
          { name: 'Mashed banana', quantity: '1-2 tbsp', benefits: 'Natural sweetness and potassium', localName: 'केले का मैश' },
          { name: 'Breast milk/formula', quantity: 'As needed', benefits: 'Primary nutrition source', localName: 'माँ का दूध' }
        ],
        lunch: [
          { name: 'Khichdi (soft)', quantity: '2-3 tbsp', benefits: 'Complete protein and carbs', localName: 'सॉफ्ट खिचड़ी' },
          { name: 'Mashed sweet potato', quantity: '1-2 tbsp', benefits: 'Vitamin A and fiber', localName: 'शकरकंद' },
          { name: 'Pureed apple', quantity: '1-2 tbsp', benefits: 'Vitamins and fiber', localName: 'सेब प्यूरी' }
        ],
        dinner: [
          { name: 'Ragi porridge', quantity: '2-3 tbsp', benefits: 'Calcium and iron', localName: 'रागी का दलिया' },
          { name: 'Mashed dal', quantity: '1-2 tbsp', benefits: 'Protein and folate', localName: 'दाल मैश' },
          { name: 'Breast milk/formula', quantity: 'As needed', benefits: 'Comfort and nutrition', localName: 'माँ का दूध' }
        ],
        snacks: [
          { name: 'Teething biscuits', quantity: '1 piece', benefits: 'Self-feeding practice', localName: 'बिस्कुट' },
          { name: 'Boiled and mashed peas', quantity: '1 tbsp', benefits: 'Protein and vitamins', localName: 'मटर मैश' }
        ]
      },
      guidelines: [
        'Start with single-ingredient foods',
        'Introduce new foods every 3-4 days',
        'Breast milk remains primary nutrition source',
        'Watch for allergic reactions',
        'Offer variety in textures gradually'
      ]
    },
    toddler: {
      stage: 'Toddler (1-2 years)',
      meals: {
        breakfast: [
          { name: 'Paratha with vegetables', quantity: '1 small', benefits: 'Carbs and hidden vegetables', localName: 'वेज पराठा' },
          { name: 'Whole milk', quantity: '1/2 cup', benefits: 'Calcium and healthy fats', localName: 'दूध' },
          { name: 'Cut fruits', quantity: '1/4 cup', benefits: 'Vitamins and natural sugars', localName: 'कटा हुआ फल' }
        ],
        lunch: [
          { name: 'Rice and dal', quantity: '1/3 cup each', benefits: 'Complete protein profile', localName: 'चावल दाल' },
          { name: 'Cooked vegetables', quantity: '1/4 cup', benefits: 'Vitamins and minerals', localName: 'पकी सब्जी' },
          { name: 'Ghee', quantity: '1/2 tsp', benefits: 'Healthy fats for brain development', localName: 'घी' }
        ],
        dinner: [
          { name: 'Soft roti pieces', quantity: '1/2 roti', benefits: 'Self-feeding and carbs', localName: 'रोटी के टुकड़े' },
          { name: 'Chicken/paneer curry', quantity: '2-3 tbsp', benefits: 'High-quality protein', localName: 'चिकन/पनीर' },
          { name: 'Mashed vegetables', quantity: '2 tbsp', benefits: 'Fiber and nutrients', localName: 'मसली सब्जी' }
        ],
        snacks: [
          { name: 'Banana slices', quantity: '1/2 banana', benefits: 'Quick energy and potassium', localName: 'केले के टुकड़े' },
          { name: 'Homemade cookies', quantity: '1-2 small', benefits: 'Healthy treat option', localName: 'घर का बिस्कुट' }
        ]
      },
      guidelines: [
        'Offer variety of textures and flavors',
        'Let child self-feed with supervision',
        'Include all food groups daily',
        'Limit processed foods and added sugars',
        'Make mealtimes enjoyable and stress-free'
      ]
    }
  };

  const currentPlan = nutritionPlans[selectedStage];
  const meals = ['breakfast', 'lunch', 'dinner', 'snacks'] as const;

  return (
    <div className="pb-20 px-4 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Nutrition Guide</h2>
        <p className="text-gray-600">Indian diet-based meal plans for every stage</p>
      </div>

      {/* Stage Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Select Stage</h3>
        <div className="grid grid-cols-2 gap-3">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedStage === stage.id
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
              >
                <div className={`p-2 rounded-lg mb-2 mx-auto w-fit ${
                  selectedStage === stage.id ? 'bg-orange-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    selectedStage === stage.id ? 'text-orange-600' : 'text-gray-600'
                  }`} />
                </div>
                <p className={`font-medium text-sm ${
                  selectedStage === stage.id ? 'text-orange-600' : 'text-gray-700'
                }`}>
                  {stage.label}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Meal Tabs */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">Meal Plan</h3>
        <div className="flex bg-gray-100 rounded-lg p-1 overflow-x-auto">
          {meals.map((meal) => (
            <button
              key={meal}
              onClick={() => setSelectedMeal(meal)}
              className={`flex-1 min-w-fit py-2 px-3 rounded-md text-sm font-medium transition-all ${
                selectedMeal === meal
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {meal.charAt(0).toUpperCase() + meal.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Meal Content */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-orange-600" />
            <h4 className="font-semibold text-gray-800 capitalize">{selectedMeal} Plan</h4>
          </div>

          <div className="space-y-3">
            {currentPlan.meals[selectedMeal].map((food, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Apple className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="font-medium text-gray-800">{food.name}</h5>
                    <span className="text-sm text-gray-600 font-medium">{food.quantity}</span>
                  </div>
                  {food.localName && (
                    <p className="text-sm text-orange-600 mb-1">{food.localName}</p>
                  )}
                  <p className="text-sm text-gray-600">{food.benefits}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-gray-800">Guidelines</h4>
          </div>
          
          <div className="space-y-2">
            {currentPlan.guidelines.map((guideline, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{guideline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traditional Indian Foods Spotlight */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
          <div className="flex items-center space-x-2 mb-3">
            <Heart className="w-5 h-5 text-yellow-600" />
            <h4 className="font-semibold text-gray-800">Traditional Indian Superfoods</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-1">Ragi (रागी)</h5>
              <p className="text-xs text-gray-600">Rich in calcium, perfect for growing babies</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-1">Ghee (घी)</h5>
              <p className="text-xs text-gray-600">Healthy fats for brain development</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-1">Dal (दाल)</h5>
              <p className="text-xs text-gray-600">Complete protein when combined with rice</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <h5 className="font-medium text-gray-800 mb-1">Khichdi (खिचड़ी)</h5>
              <p className="text-xs text-gray-600">Easy to digest, balanced nutrition</p>
            </div>
          </div>
        </div>

        {/* Warning Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium mb-1">Important Note</p>
              <p className="text-sm text-amber-700">
                These are general guidelines. Always consult with your pediatrician or nutritionist for personalized advice, especially if your baby has allergies or special dietary needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionGuide;