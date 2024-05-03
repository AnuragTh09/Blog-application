import { Logo } from "../index";

function Footer() {
  return (
    <footer className="flex">
      <div className="flex flex-wrap gap-x-20 md:flex-row md:justify-center md:items-stretch gap-y-10 flex-col items-center w-full sm:px-5 sm:pt-5">
        <div className=" flex flex-col justify-between items-center gap-y-4">
          <Logo />
          <p className="content-center font-semibold md:w-auto md:m-w-0 sm:min-w-[300px] min-w-0 text-[15px] text-slate-700">
            © Copyright 2024. All Rights Reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-y-5 justify-center gap-x-28">
          <nav>
            <h3 className="font-bold text-[17px]">COMPANY</h3>
            <ul className="flex flex-col gap-y-1 font-semibold mt-2">
              <li className="text-[15px] text-slate-800">Features</li>
              <li className="text-[15px] text-slate-800">Pricing</li>
              <li className="text-[15px] text-slate-800">Affiliate Program</li>
              <li className="text-[15px] text-slate-800">Press Kit</li>
            </ul>
          </nav>
          <nav>
            <h3 className="font-bold text-[17px]">SUPPORT</h3>
            <ul className="flex flex-col gap-y-1 font-semibold mt-2">
              <li className="text-[15px] text-slate-800">Account</li>
              <li className="text-[15px] text-slate-800">Help</li>
              <li className="text-[15px] text-slate-800">Contact Us</li>
              <li className="text-[15px] text-slate-800">Customer Support</li>
            </ul>
          </nav>
          <nav>
            <h3 className="font-bold text-[17px]">LEGALS</h3>
            <ul className="flex flex-col gap-y-1 font-semibold mt-2">
              <li className="text-[15px] text-slate-800">Terms & Conditions</li>
              <li className="text-[15px] text-slate-800">Privacy Policy</li>
              <li className="text-[15px] text-slate-800">Licensing</li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
