import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      {/* Sol kısım: İkonlar ve linkler */}
      <div className="flex items-center space-x-4">
        <Link href="/" aria-label="Home">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new" aria-label="New Ticket">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>

      {/* Sağ kısım: Mail adresi */}
      <div>
        <a href="mailto:anilakbay20@gmail.com" className="text-default-text">
          anilakbay20@gmail.com
        </a>
      </div>
    </nav>
  );
};

export default Nav;
