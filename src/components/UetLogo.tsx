import uetLogoImg from '../assets/icons/uet-logo.png'

// 디자인팀에서 전달받은 UET 원본 로고 이미지 컴포넌트
export function UetLogo({ size = 44 }: { size?: number }) {
  return (
    <img
      src={uetLogoImg}
      alt="UET 로고"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}
