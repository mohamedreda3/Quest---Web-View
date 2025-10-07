import { DefaultAccordion } from "../Accordian/Accordian";

export default function Modules({ course }) {
  return (
    <section className="px-10 my-8 text-[#597B82] module-page">
      <h2 className="text-lg font-normal mt-4">
        There are 5 modules in this course!
      </h2>
      <p className="text-[10px]">
        A surgery course may be structured around the following core modules
      </p>
      <div>
        <DefaultAccordion course={course} />
      </div>
    </section>
  );
}
