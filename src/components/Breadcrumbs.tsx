import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <nav className="text-sm text-gray-500 mb-4">
      <ul className="flex items-center space-x-1">
        <li>
          <Link
            to="/admin"
            className="hover:underline text-primary font-medium"
          >
            Dashboard
          </Link>
        </li>
        {pathnames.map((segment, index) => {
          const path = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={path} className="flex items-center space-x-1">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="capitalize">{segment}</span>
              ) : (
                <Link
                  to={path}
                  className="hover:underline capitalize text-primary"
                >
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
