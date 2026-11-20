// Canva 시안의 UET 로고 도형 경로와 글자 배치를 그대로 SVG로 구현한 컴포넌트
export function UetLogo({ size = 46 }: { size?: number }) {
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
        x="5"
        y="24"
        fill="#ffffff"
        fontSize="22"
        fontWeight="700"
        fontFamily="'Oswald', sans-serif"
      >
        U
      </text>
      <text
        x="19"
        y="36"
        fill="#ffffff"
        fontSize="19"
        fontWeight="700"
        fontFamily="'Oswald', sans-serif"
      >
        E
      </text>
      <text
        x="33"
        y="45"
        fill="#ffffff"
        fontSize="18"
        fontWeight="700"
        fontFamily="'Oswald', sans-serif"
      >
        T
      </text>
    </svg>
  )
}
