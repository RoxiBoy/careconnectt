import { Emergency } from ".";
const Header = () => {
  const handleLogOut = () => {
    window.localStorage.clear()
    window.location.href = '/'
  }
  return (
    <header className="bg-white py-6 px-10 shadow-lg">
      <div className="flex justify-between items-center">
        <a href='/'><h1 className="text-4xl font-extrabold text-blue-800 cursor-pointer" >CareConnect</h1></a>
          <div className="flex gap-2">
            <Emergency />
            <button onClick={handleLogOut} className="fontbold text-2xl bg-indigo-400 cursor-pointer text-white p-2 rounded-lg px-4 hover:bg-pink-700 transition transition-all duration-100">Log Out</button>
          </div>
      </div>
    </header>
  );
};

export default Header;
