"use client";
type IconName =
  | "addCircle"
  | "search"
  | "checkCircle"
  | "hash"
  | "bell"
  | "inbox"
  | "upcoming"
  | "openClose"
  | "line"
  | "today"
  | "complete"
  | "three-line";

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}
const todayNumber = new Date().getDate();
// console.log(todayNumber);

export default function Icon({ name, size = 24, className = "" }: IconProps) {
  switch (name) {
    case "addCircle":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11m-.711-16.5a.75.75 0 1 1 1.5 0v4.789H17.5a.75.75 0 0 1 0 1.5h-4.711V17.5a.75.75 0 0 1-1.5 0V12.79H6.5a.75.75 0 1 1 0-1.5h4.789z"
            clipRule="evenodd"
          />
        </svg>
      );

    case "search":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M16.29 15.584a7 7 0 1 0-.707.707l3.563 3.563a.5.5 0 0 0 .708-.707zM11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12"
            clipRule="evenodd"
          />
        </svg>
      );

    case "checkCircle":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          className={className}
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 21.001a9 9 0 1 0 0-18 9 9 0 0 0 0 18m-4.354-8.104a.5.5 0 0 1 .708 0l2.146 2.147 5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708"
            clipRule="evenodd"
          />
        </svg>
      );

    case "hash":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className={className}
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M15.994 6.082a.5.5 0 1 0-.987-.164L14.493 9h-3.986l.486-2.918a.5.5 0 1 0-.986-.164L9.493 9H7a.5.5 0 1 0 0 1h2.326l-.666 4H6a.5.5 0 0 0 0 1h2.493l-.486 2.918a.5.5 0 1 0 .986.164L9.507 15h3.986l-.486 2.918a.5.5 0 1 0 .987.164L14.507 15H17a.5.5 0 1 0 0-1h-2.326l.667-4H18a.5.5 0 1 0 0-1h-2.493zM14.327 10H10.34l-.667 4h3.987z"
            clip-rule="evenodd"
          ></path>
        </svg>
      );

    case "bell":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className={className}
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="m6.585 15.388-.101.113c-.286.322-.484.584-.484 1h12c0-.416-.198-.678-.484-1l-.101-.113c-.21-.233-.455-.505-.7-.887-.213-.33-.355-.551-.458-.79-.209-.482-.256-1.035-.4-2.71-.214-3.5-1.357-5.5-3.857-5.5s-3.643 2-3.857 5.5c-.144 1.675-.191 2.227-.4 2.71-.103.239-.245.46-.457.79-.246.382-.491.654-.701.887m10.511-2.312c-.083-.341-.131-.862-.241-2.148-.113-1.811-.469-3.392-1.237-4.544C14.8 5.157 13.57 4.5 12 4.5s-2.8.656-3.618 1.883c-.768 1.152-1.124 2.733-1.237 4.544-.11 1.286-.158 1.807-.241 2.148-.062.253-.13.373-.46.884-.198.308-.373.504-.57.723q-.11.12-.232.261c-.293.342-.642.822-.642 1.557a1 1 0 0 0 1 1h3a3 3 0 0 0 6 0h3a1 1 0 0 0 1-1c0-.735-.35-1.215-.642-1.557q-.122-.141-.232-.261c-.197-.22-.372-.415-.57-.723-.33-.511-.398-.63-.46-.884M14 17.5h-4a2 2 0 1 0 4 0"
            clip-rule="evenodd"
          ></path>
        </svg>
      );
    case "inbox":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M8.062 4h7.876a2 2 0 0 1 1.94 1.515l2.062 8.246q.06.24.06.486V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3.754a2 2 0 0 1 .06-.485L6.12 5.515A2 2 0 0 1 8.061 4m0 1a1 1 0 0 0-.97.758L5.03 14.004a1 1 0 0 0-.03.242V18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.754a1 1 0 0 0-.03-.242L16.91 5.758a1 1 0 0 0-.97-.758zm6.643 10a2.75 2.75 0 0 1-5.41 0H7a.5.5 0 1 1 0-1h2.75a.5.5 0 0 1 .5.5 1.75 1.75 0 1 0 3.5 0 .5.5 0 0 1 .5-.5H17a.5.5 0 0 1 0 1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      );
    case "line":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className={className}
        >
          <path
            fill="currentColor"
            d="M15 15.985v-11c0-.517-.166-.815-.332-.98a.94.94 0 0 0-.668-.27.94.94 0 0 0-.668.27c-.166.165-.332.463-.332.98v14c0 .996-.328 1.835-.914 2.428a2.9 2.9 0 0 1-2.097.854C8.435 22.25 7 21.027 7 18.985v-9c0-.517-.166-.815-.332-.98A.94.94 0 0 0 6 8.735a.94.94 0 0 0-.668.27c-.166.165-.332.463-.332.98v5a1 1 0 1 1-2 0v-5c0-.983.334-1.81.918-2.395A2.94 2.94 0 0 1 6 6.735c.747 0 1.507.28 2.082.855.584.585.918 1.412.918 2.395v9c0 .959.565 1.278 1.01 1.283a.9.9 0 0 0 .654-.262c.164-.166.336-.474.336-1.021v-14c0-.983.334-1.81.918-2.395A2.94 2.94 0 0 1 14 1.735c.747 0 1.507.28 2.082.855.584.585.918 1.412.918 2.395v11c0 .517.166.815.332.98a.94.94 0 0 0 .668.27.94.94 0 0 0 .668-.27c.166-.165.332-.463.332-.98v-4a1 1 0 1 1 2 0v4c0 .983-.334 1.81-.918 2.395a2.94 2.94 0 0 1-2.082.855c-.747 0-1.507-.28-2.082-.855-.584-.585-.918-1.412-.918-2.395"
          ></path>
        </svg>
      );
    case "openClose":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          fill="currentColor"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          strokeWidth="0.5"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2m-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9z"
            clip-rule="evenodd"
          />
        </svg>
      );
    case "upcoming":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm10 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m9-5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-3-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0M7 8a.5.5 0 0 0 0 1h10a.5.5 0 0 0 0-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      );
    case "today":
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
        >
          <g fill="currentColor" fill-rule="evenodd">
            <path
              fill-rule="nonzero"
              d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6zm1 3h10a.5.5 0 1 1 0 1H7a.5.5 0 0 1 0-1z"
            ></path>
            <text
              font-family="var(--font-family-regular)"
              font-size="9"
              transform="translate(4 2)"
              font-weight="500"
            >
              <tspan x="8" y="15" text-anchor="middle">
                {todayNumber}
              </tspan>
            </text>
          </g>
        </svg>
      );
    case "complete":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={className}
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M12 21.001a9 9 0 1 0 0-18 9 9 0 0 0 0 18m0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16m-4.354-8.104a.5.5 0 0 1 .708 0l2.146 2.147 5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708"
            clip-rule="evenodd"
          ></path>
        </svg>
      );
    case "three-line":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          className={className}
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M17.333 4.001A2.667 2.667 0 0 1 20 6.668v10.667A2.667 2.667 0 0 1 17.333 20H6.667A2.667 2.667 0 0 1 4 17.335V6.668A2.667 2.667 0 0 1 6.667 4zm-.083 1H6.75a1.75 1.75 0 0 0-1.745 1.62L5 6.75v10.5a1.75 1.75 0 0 0 1.62 1.745l.13.005h10.5a1.75 1.75 0 0 0 1.745-1.62l.005-.13v-10.5a1.75 1.75 0 0 0-1.62-1.745zm-.75 7c0-.276-.183-.5-.41-.5H7.91l-.074.008c-.191.043-.336.247-.336.492 0 .276.183.5.41.5h8.18l.074-.008c.191-.042.336-.246.336-.492m-.41 3.5c.227 0 .41.224.41.5 0 .246-.145.45-.336.492l-.073.008H7.909c-.226 0-.409-.224-.409-.5 0-.245.145-.45.336-.492l.073-.008zm.41-7.5c0-.276-.183-.5-.41-.5H7.91l-.074.008c-.191.043-.336.247-.336.492 0 .276.183.5.41.5h8.18l.074-.008c.191-.042.336-.246.336-.492"
            clip-rule="evenodd"
          ></path>
        </svg>
      );
    default:
      return null;
  }
}

;
