import { Disclosure, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { Avatar } from "antd";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../components/Common/Loader";

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const supabase = useSupabaseClient();

  const users = useUser();

  const { isLoading } = useQuery(["fetchAuthLanding"], async () => {
    const user = await supabase.auth.getUser();
    return user?.data;
  });
  if (isLoading) {
    return <Loader />;
  }

  if (!users) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {() => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <Link
                    to="/"
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 flex items-center mr-4"
                  >
                    <img
                      className="h-8 w-auto"
                      src="/logo.png"
                      alt="Dialoqbase"
                    />
                    <span className="ml-1 text-xl font-bold">Dialoqbase</span>
                    <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 ml-2">
                      {/* @ts-ignore */}
                      {`v${__APP_VERSION__}`}
                    </span>
                  </Link>
                  <div className=" ml-6 flex items-center">
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm">
                          <span className="sr-only">Open user menu</span>
                          <Avatar shape="square">
                            {users?.user_metadata?.full_name ||
                              users?.email ||
                              "..."}
                          </Avatar>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                to="/settings"
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                                onClick={() => {
                                  supabase.auth.signOut();
                                  navigate("/login");
                                }}
                              >
                                Sign out
                              </span>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Avatar shape="square">
                        {users?.user_metadata?.full_name ||
                          users?.email ||
                          "..."}
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {users?.user_metadata?.full_name ||
                          users?.email ||
                          "..."}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as={Link}
                      to="/settings"
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Settings
                    </Disclosure.Button>
                    <Disclosure.Button
                      onClick={() => {
                        supabase.auth.signOut();
                        navigate("/login");
                      }}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className="py-10">
          <main>
            <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
