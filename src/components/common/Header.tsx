import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ListBulletIcon,
  TableCellsIcon,
  WindowIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { User } from "../../types/User";
import { Link } from "raviger";

// sample data
const products = [
  {
    name: "Board",
    description: "View all tasks in Board/Kanban format",
    type: "board",
    icon: WindowIcon,
  },
  {
    name: "List",
    description: "View all tasks in List format",
    type: "list",
    icon: ListBulletIcon,
  },
  {
    name: "Table",
    description: "View all tasks in Table format",
    type: "table",
    icon: TableCellsIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header(props: {
  currentUser: User;
  setCurrentUserCB: (value: User) => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [view, setView] = useState<string | null>(null);

  useEffect(() => {
    let view = localStorage.getItem("view");
    if (view === null) {
      view = "board";
    }
  }, []);

  useEffect(() => {
    if (view) {
      localStorage.setItem("view", view);
      window.location.reload();
    }
  }, [view]);

  return (
    <header className="bg-back2">
      <nav
        className="mx-auto flex  items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        {props.currentUser.username.length > 0 ? (
          <div className="text-sm font-semibold leading-6 text-gray-200 mr-6 p-2 rounded-lg bg-col3">
            User: {props.currentUser.username}
          </div>
        ) : null}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-200">
              View
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-back2 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-indigo-500/20"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-col3 group-hover:bg-col3">
                        <item.icon
                          className="h-6 w-6 text-gray-200 group-hover:text-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <button
                          onClick={() => setView(item.type)}
                          className="block font-semibold text-gray-200"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </button>
                        <p className="mt-1 text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            href="/"
            className="text-sm font-semibold leading-6 text-gray-200"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-sm font-semibold leading-6 text-gray-200"
          >
            About
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {props.currentUser.username.length > 0 ? (
            <button
              className="text-sm font-semibold leading-6 text-gray-200"
              onClick={() => {
                localStorage.removeItem("token");
                props.setCurrentUserCB({
                  username: "",
                });
                // navigate("/login");
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-200"
            >
              Log in &rarr;
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10 bg-back/50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-back2 px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            {props.currentUser.username.length > 0 ? (
              <div className="text-sm font-semibold leading-6 text-gray-200 mr-6 p-2 rounded-lg bg-col3">
                User: {props.currentUser.username}
              </div>
            ) : null}
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-300/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-200 hover:bg-col3/60">
                        View
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            onClick={() => setView(item.type)}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-200 hover:bg-col3/20"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-col3/30"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-col3/30"
                >
                  About
                </Link>
              </div>
              <div className="py-6">
                {props.currentUser.username.length > 0 ? (
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-col3/20"
                    onClick={() => {
                      localStorage.removeItem("token");
                      props.setCurrentUserCB({
                        username: "",
                      });
                      // navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-col3/20"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
