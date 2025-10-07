export default function Skills({ course }) {
  return (
    <section className="px-10 my-8 text-[#597B82]">
      <h2 className="text-lg font-normal my-4">Skills you’ll gain</h2>
      <div className="flex align-middle gap-2 flex-wrap">
        {course?.skills?.map((item) => {
          return (
            <div className="bg-[#E1E1E1] px-6 py-1 rounded-lg flex justify-center align-middle">
              <p className="text-[11px]">{item?.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
