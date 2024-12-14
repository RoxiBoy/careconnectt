import React from 'react';

const PregnancyEmergencyTips = () => {
  const tips = [
    {
      title: 'Severe Abdominal Pain',
      description:
        'If you experience severe or persistent abdominal pain, it could indicate a serious condition like an ectopic pregnancy or miscarriage. Seek immediate medical attention.',
    },
    {
      title: 'Heavy Bleeding',
      description:
        'Heavy bleeding during pregnancy is a sign of possible complications such as miscarriage or placental abruption. Call your healthcare provider immediately if you experience heavy bleeding.',
    },
    {
      title: 'Severe Headaches or Vision Changes',
      description:
        'Severe headaches or vision changes can be a sign of high blood pressure or preeclampsia. If you experience these symptoms, contact your doctor right away.',
    },
    {
      title: 'Severe Swelling of Hands or Face',
      description:
        'Swelling of the hands, feet, and face can be normal in pregnancy, but sudden, severe swelling can indicate a problem with your blood pressure or preeclampsia. Seek medical advice immediately.',
    },
    {
      title: 'Painful Urination or Blood in Urine',
      description:
        'Painful urination or blood in the urine can indicate a urinary tract infection (UTI) or kidney infection, which require prompt treatment during pregnancy.',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-teal-50 to-teal-100 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-teal-900 text-center mb-6">Pregnancy Emergency Tips</h2>
        <p className="text-lg text-teal-800 text-center mb-8">
          In case of any pregnancy-related emergency, it’s important to stay calm and seek immediate medical help.
        </p>
        
        <div className="space-y-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-teal-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-teal-800 mb-4">{tip.title}</h3>
              <p className="text-lg text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PregnancyEmergencyTips;
