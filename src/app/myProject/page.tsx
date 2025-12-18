import MainProjects from "@/components/mainProject";

function page() {
  return (
    <><h5 className="text-sm px-10 font-semibold text-gray-500">My Porject /</h5>
      <div className="flex w-full justify-center my-5">
        <div className="flex flex-col w-full max-w-3xl">
          <MainProjects />
        </div>
      </div>
    </>
  );
}

export default page;
