import { NavLink } from 'react-router-dom';

const Menus = [
    { title: "Dashboard", path: "/" },
    { title: "Products", path: "/products" },
    { title: "Users", path: "/users" },
    { title: "Orders", path: "/orders" },
];

const Sidebar = () => {


    return (
        <div className="w-72 bg-white h-screen p-5 pt-8 relative duration-300">
            <div className="flex gap-x-4 items-center">
                <h1>QUDE ADMIN</h1>
            </div>
            <ul className="pt-6">
                {Menus.map((Menu, index) => (
                    <li key={index} className="mt-2">
                        <NavLink
                            to={Menu.path}
                            className="flex rounded-md p-2 cursor-pointer hover:bg-gray-900 hover:text-white text-gray-700 text-sm items-center gap-x-4 bg-light-white"
                        // activeClassName="bg-gray-900 text-white"
                        >
                            <span className="origin-left duration-200">
                                {Menu.title}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
