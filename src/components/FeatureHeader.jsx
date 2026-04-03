import LanguageSwitcher from "../components/LanguageSwitcher";

function FeatureHeader({ title }) {
  return (
    <div className="bg-[#60D2CC] w-screen h-30 flex justify-between items-center p-4 xl:justify-center xl:gap-30">
      <p className="text-3xl text-white font-semibold">{title}</p>
      <div><LanguageSwitcher/></div>
    </div>
  );
}

export default FeatureHeader;
