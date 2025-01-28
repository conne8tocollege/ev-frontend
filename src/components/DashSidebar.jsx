import { Sidebar, Dropdown } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiChartPie,
  HiInboxIn
} from "react-icons/hi";
import { FaRegFileCode } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const apiUrl = import.meta.env.VITE_BASE_URL;

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const isActiveTab = (tab) => {
    return location.search.includes(`tab=${tab}`);
  };
  const isActiveTabMeta = (tabs) => {
    return tabs.some((tab) => location.search.includes(`tab=${tab}`));
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        localStorage.removeItem("access_token");
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56 shadow mt-2">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser.isAdmin && (
            <div>
              <Link to="/dashboard?tab=dash">
                <Sidebar.Item
                  active={isActiveTab("dash")}
                  icon={HiChartPie}
                  className={`cursor-pointer ${
                    isActiveTab("dash") ? "bg-cyan-200" : ""
                  }`}
                >
                  Dashboard
                </Sidebar.Item>
              </Link>

              <Link to="/dashboard?tab=profile">
                <Sidebar.Item
                  active={isActiveTab("profile")}
                  icon={HiUser}
                  label={currentUser.isAdmin ? "Admin" : "User"}
                  className={`cursor-pointer ${
                    isActiveTab("profile") ? "bg-cyan-200" : ""
                  }`}
                >
                  Profile
                </Sidebar.Item>
              </Link>

              {/* Metadata Dropdown */}
              <Sidebar.Item
                icon={FaRegFileCode}
                className={`cursor-pointer ${
                  isActiveTabMeta([
                    "home",
                    "about",
                    "blog",
                    "contact",
                    "othermeta",
                  ])
                    ? "bg-cyan-200"
                    : ""
                }`}
              >
                <Dropdown label="Metadata" inline>
                  <Link to="/dashboard?tab=home">
                    <Dropdown.Item active={isActiveTabMeta(["home"])}>
                      Home
                    </Dropdown.Item>
                  </Link>
                  <Link to="/dashboard?tab=about">
                    <Dropdown.Item active={isActiveTabMeta(["about"])}>
                      About
                    </Dropdown.Item>
                  </Link>
                  <Link to="/dashboard?tab=blog">
                    <Dropdown.Item active={isActiveTabMeta(["blog"])}>
                      Blog
                    </Dropdown.Item>
                  </Link>
                  <Link to="/dashboard?tab=contact">
                    <Dropdown.Item active={isActiveTabMeta(["contact"])}>
                      Contact
                    </Dropdown.Item>
                  </Link>
                  <Link to="/dashboard?tab=othermeta">
                    <Dropdown.Item active={isActiveTabMeta(["othermeta"])}>
                      Other MetaData
                    </Dropdown.Item>
                  </Link>
                </Dropdown>
              </Sidebar.Item>

              <Link to="/dashboard?tab=inquiries">
                <Sidebar.Item
                  active={isActiveTab("inquiries")}
                  icon={HiDocumentText}
                  className={`cursor-pointer ${
                    isActiveTab("inquiries") ? "bg-cyan-200" : ""
                  }`}
                >
                  Booking Inquiries
                </Sidebar.Item>
              </Link>

              <Link to="/dashboard?tab=dealership">
                <Sidebar.Item
                  active={isActiveTab("dealership")}
                  icon={HiInboxIn}
                  className={`cursor-pointer ${
                    isActiveTab("dealership") ? "bg-cyan-200" : ""
                  }`}
                >
                  Dealership
                </Sidebar.Item>
              </Link>

              <Link to="/dashboard?tab=posts">
                <Sidebar.Item
                  active={isActiveTab("posts")}
                  icon={HiDocumentText}
                  className={`cursor-pointer ${
                    isActiveTab("posts") ? "bg-cyan-200" : ""
                  }`}
                >
                  Posts
                </Sidebar.Item>
              </Link>

              <Link to="/dashboard?tab=products">
                <Sidebar.Item
                  active={isActiveTab("products")}
                  icon={HiDocumentText}
                  className={`cursor-pointer ${
                    isActiveTab("products") ? "bg-cyan-200" : ""
                  }`}
                >
                  Products
                </Sidebar.Item>
              </Link>

              <Link to="/dashboard?tab=sliders">
                <Sidebar.Item
                  active={isActiveTab("sliders")}
                  icon={HiDocumentText}
                  className={`cursor-pointer ${
                    isActiveTab("sliders") ? "bg-cyan-200" : ""
                  }`}
                >
                  Sliders
                </Sidebar.Item>
              </Link>

              <Link to="/dashboard?tab=testimonials">
                <Sidebar.Item
                  active={isActiveTab("testimonials")}
                  icon={HiDocumentText}
                  className={`cursor-pointer ${
                    isActiveTab("testimonials") ? "bg-cyan-200" : ""
                  }`}
                >
                  Testimonials
                </Sidebar.Item>
              </Link>

              <Sidebar.Item
                icon={HiArrowSmRight}
                className="cursor-pointer"
                onClick={handleSignout}
              >
                Sign Out
              </Sidebar.Item>
            </div>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
