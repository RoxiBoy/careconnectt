const EmergencySection = () => {
  const handleClick = (e) => {
    window.location.href='/pregnencyemergency'
  }
  return (
    <section className="fontbold text-2xl bg-indigo-400 cursor-pointer text-white p-2 rounded-lg px-4 hover:bg-pink-700 transition transition-all duration-100" onClick={handleClick}>
      Emergency
    </section>
  );
};

export default EmergencySection;
