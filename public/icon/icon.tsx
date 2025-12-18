type IconName =
  | "openClose"
  | "search"
  | "Today"
  | "checkCircle"
  | "Upcoming"
  | "line"
  | "bill";

type IconProps = {
  name: IconName;
  className?: string;
  color?: string;
};

const Icon = ({ name, className, color = "" }: IconProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      {name === "openClose" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
           width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            fillRule="evenodd"
            d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2m-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}

      {name === "search" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
             width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
           fillRule="evenodd"
            d="M16.29 15.584a7 7 0 1 0-.707.707l3.563 3.563a.5.5 0 0 0 .708-.707zM11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12"
            clipRule="evenodd"
          ></path>
        </svg>
      )}

     {name === "Today" && (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <g fill="black" fillRule="evenodd">
      <path
        fillRule="nonzero"
        d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
      />
      <text
        fontFamily="var(--font-family-regular)"
        fontSize={9}
        fontWeight={500}
        transform="translate(4 2)"
      >
        <tspan x="8" y="15" textAnchor="middle">
          17
        </tspan>
      </text>
    </g>
  </svg>
)}


      {name === "checkCircle" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
             width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="black"
            fillRule="evenodd"
            d="M12 21.001a9 9 0 1 0 0-18 9 9 0 0 0 0 18m0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16m-4.354-8.104a.5.5 0 0 1 .708 0l2.146 2.147 5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708"
            clipRule="evenodd"
          ></path>
        </svg>
      )}

      {name === "Upcoming" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
             width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="gray"
            fillRule="evenodd"
            d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}

      {name === "bill" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
              width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="black"
            fillRule="evenodd"
            d="m6.585 15.388-.101.113c-.286.322-.484.584-.484 1h12c0-.416-.198-.678-.484-1l-.101-.113c-.21-.233-.455-.505-.7-.887-.213-.33-.355-.551-.458-.79-.209-.482-.256-1.035-.4-2.71-.214-3.5-1.357-5.5-3.857-5.5s-3.643 2-3.857 5.5c-.144 1.675-.191 2.227-.4 2.71-.103.239-.245.46-.457.79-.246.382-.491.654-.701.887m10.511-2.312c-.083-.341-.131-.862-.241-2.148-.113-1.811-.469-3.392-1.237-4.544C14.8 5.157 13.57 4.5 12 4.5s-2.8.656-3.618 1.883c-.768 1.152-1.124 2.733-1.237 4.544-.11 1.286-.158 1.807-.241 2.148-.062.253-.13.373-.46.884-.198.308-.373.504-.57.723q-.11.12-.232.261c-.293.342-.642.822-.642 1.557a1 1 0 0 0 1 1h3a3 3 0 0 0 6 0h3a1 1 0 0 0 1-1c0-.735-.35-1.215-.642-1.557q-.122-.141-.232-.261c-.197-.22-.372-.415-.57-.723-.33-.511-.398-.63-.46-.884M14 17.5h-4a2 2 0 1 0 4 0"
            clipRule="evenodd">

          </path>
        </svg>
      )}

      {name === "line" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
              width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M15 15.985v-11c0-.517-.166-.815-.332-.98a.94.94 0 0 0-.668-.27.94.94 0 0 0-.668.27c-.166.165-.332.463-.332.98v14c0 .996-.328 1.835-.914 2.428a2.9 2.9 0 0 1-2.097.854C8.435 22.25 7 21.027 7 18.985v-9c0-.517-.166-.815-.332-.98A.94.94 0 0 0 6 8.735a.94.94 0 0 0-.668.27c-.166.165-.332.463-.332.98v5a1 1 0 1 1-2 0v-5c0-.983.334-1.81.918-2.395A2.94 2.94 0 0 1 6 6.735c.747 0 1.507.28 2.082.855.584.585.918 1.412.918 2.395v9c0 .959.565 1.278 1.01 1.283a.9.9 0 0 0 .654-.262c.164-.166.336-.474.336-1.021v-14c0-.983.334-1.81.918-2.395A2.94 2.94 0 0 1 14 1.735c.747 0 1.507.28 2.082.855.584.585.918 1.412.918 2.395v11c0 .517.166.815.332.98a.94.94 0 0 0 .668.27.94.94 0 0 0 .668-.27c.166-.165.332-.463.332-.98v-4a1 1 0 1 1 2 0v4c0 .983-.334 1.81-.918 2.395a2.94 2.94 0 0 1-2.082.855c-.747 0-1.507-.28-2.082-.855-.584-.585-.918-1.412-.918-2.395"
          ></path>
        </svg>
      )}
    </svg>
  );
};

export default Icon;
