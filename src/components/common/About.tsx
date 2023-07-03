export default function About() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">About</h1>
      <p className="text-xl mt-4">
        This is a simple Kanban Board application built with React, Typescript,
        and TailwindCSS.
      </p>
      <p className="text-xl mt-4">
        The backend is built with Django and Django Rest Framework.
      </p>
      <p className="text-xl mt-4">
        Created by{" "}
        <a
          href="https://github.com/kshitijv256"
          className="text-blue-500"
          target="_blank"
          rel="noreferrer"
        >
          Kshitij Verma
        </a>
        .
      </p>
    </div>
  );
}
