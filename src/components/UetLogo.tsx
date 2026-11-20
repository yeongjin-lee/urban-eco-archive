// Canva 시안의 UET 로고 도형 경로를 그대로 SVG로 구현한 컴포넌트
export function UetLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14.7 0C33.6 0 49 15.4 49 34.3V49H34.3C15.4 49 0 33.6 0 14.7V0H14.7Z"
        fill="#000000"
      />
      <text
        x="8"
        y="21"
        fill="#ffffff"
        fontSize="16"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        U
      </text>
      <text
        x="19"
        y="32"
        fill="#ffffff"
        fontSize="14"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        E
      </text>
      <text
        x="30"
        y="43"
        fill="#ffffff"
        fontSize="14"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        T
      </text>
    </svg>
  )
}
