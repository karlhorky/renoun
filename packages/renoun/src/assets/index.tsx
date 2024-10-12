import React from 'react'
import { styled } from 'restyle'

/**
 * The logo mark of the renoun library.
 * @internal
 */
export const RenounMark = styled(
  ({ size = 24, className }: { size?: number; className?: string }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M2 6.599c0-.745.56-1.575 1.25-1.853L7.844 2.89v6.302L2 11.553V6.599zM2 12.907l5.844-2.361v6.303L3.25 18.704c-.69.28-1.25-.098-1.25-.843v-4.954z"
        fill="#fff"
      />
      <path
        d="M9.095 10.036l5.844-2.361v6.302l-5.844 2.361v-6.302z"
        fill="#E7C100"
      />
      <path
        d="M9.095 2.385L13.688.53c.69-.279 1.25.099 1.25.844v4.954l-5.843 2.36V2.386z"
        fill="#fff"
      />
      <path
        d="M9.078 17.69l5.844-2.36v6.302l-4.594 1.855c-.69.28-1.25-.098-1.25-.843V17.69zM16.187 7.155l4.594-1.856c.69-.279 1.25.099 1.25.843v4.954l-5.844 2.361V7.155zM16.173 14.811l5.844-2.36v4.954c0 .744-.56 1.574-1.25 1.853l-4.594 1.856V14.81z"
        fill="#E7C100"
      />
    </svg>
  )
)

/**
 * The logo of the renoun library.
 * @internal
 */
export const RenounMarkLink = styled(
  ({
    size,
    className,
    style,
  }: {
    size?: number
    className?: string
    style?: React.CSSProperties
  }) => (
    <a
      href="https://www.renoun.dev"
      rel="noopener"
      target="_blank"
      className={className}
      style={style}
    >
      <RenounMark size={size} />
    </a>
  ),
  { display: 'flex' }
)

/**
 * The logo of the renoun library.
 * @internal
 */
export const RenounLogo = styled(
  ({
    className,
    style,
  }: {
    className?: string
    style?: React.CSSProperties
  }) => {
    return (
      <svg
        height={24}
        viewBox="0 0 105 24"
        fill="none"
        className={className}
        style={style}
      >
        <path
          d="M94.14 17.607V6.392h2.871v4.812h-.805c0-1.142.151-2.092.454-2.85.303-.77.75-1.35 1.343-1.735.606-.385 1.356-.578 2.251-.578h.124c1.336 0 2.348.434 3.036 1.301.689.854 1.033 2.134 1.033 3.842v6.423h-2.871v-6.671c0-.688-.2-1.246-.599-1.673-.386-.427-.923-.64-1.611-.64-.702 0-1.274.22-1.714.66-.427.428-.64 1.006-.64 1.736v6.588H94.14zM84.91 17.962c-1.294 0-2.299-.427-3.015-1.28-.702-.854-1.053-2.121-1.053-3.801V6.375h2.87v6.754c0 .688.194 1.24.58 1.652.385.4.908.6 1.569.6.66 0 1.198-.214 1.61-.641.428-.427.641-1.005.641-1.735v-6.63h2.871v11.236h-2.87V12.84h.825c0 1.129-.144 2.072-.433 2.83-.29.757-.723 1.328-1.302 1.714-.578.385-1.3.578-2.168.578h-.124zM72.14 18c-.992 0-1.866-.158-2.624-.475a5.728 5.728 0 01-1.92-1.28 5.814 5.814 0 01-1.198-1.86 5.995 5.995 0 01-.393-2.147v-.434c0-.771.138-1.501.413-2.19a5.806 5.806 0 011.219-1.858 5.554 5.554 0 011.941-1.281C70.336 6.158 71.19 6 72.14 6s1.804.158 2.562.475c.757.303 1.397.73 1.92 1.28a5.381 5.381 0 011.219 1.86 5.84 5.84 0 01.413 2.189v.434a5.73 5.73 0 01-.413 2.148 5.53 5.53 0 01-1.177 1.858 5.728 5.728 0 01-1.921 1.281c-.758.317-1.625.475-2.603.475zm0-2.458c.702 0 1.294-.151 1.776-.454a3.033 3.033 0 001.094-1.26c.248-.537.372-1.143.372-1.818 0-.688-.13-1.294-.392-1.817a2.833 2.833 0 00-1.116-1.26c-.482-.317-1.06-.475-1.735-.475-.674 0-1.26.158-1.755.475a3.008 3.008 0 00-1.115 1.26c-.262.523-.393 1.129-.393 1.817 0 .675.124 1.28.372 1.818.261.523.633.943 1.115 1.26.482.303 1.074.454 1.776.454zM53.15 17.607V6.392h2.87v4.812h-.805c0-1.142.151-2.092.454-2.85.303-.77.75-1.35 1.343-1.735.605-.385 1.356-.578 2.25-.578h.125c1.335 0 2.347.434 3.036 1.301.688.854 1.033 2.134 1.033 3.842v6.423h-2.871v-6.671c0-.688-.2-1.246-.6-1.673-.385-.427-.922-.64-1.61-.64-.703 0-1.274.22-1.715.66-.426.428-.64 1.006-.64 1.736v6.588h-2.87zM45.096 18c-.964 0-1.811-.165-2.54-.496a5.304 5.304 0 01-1.798-1.322 6.227 6.227 0 01-1.074-1.88 6.504 6.504 0 01-.35-2.106v-.392c0-.744.116-1.46.35-2.148a5.67 5.67 0 011.074-1.86 5.124 5.124 0 011.776-1.3C43.238 6.166 44.05 6 44.973 6c1.211 0 2.223.269 3.036.806a4.943 4.943 0 011.859 2.086 6.27 6.27 0 01.62 2.767v1.033h-9.935v-1.756h8.137l-.888.868c0-.716-.103-1.329-.31-1.838a2.455 2.455 0 00-.95-1.178c-.413-.275-.936-.413-1.57-.413-.633 0-1.17.145-1.61.434-.441.29-.778.71-1.012 1.26-.22.537-.33 1.184-.33 1.941 0 .703.11 1.33.33 1.88.22.537.557.964 1.012 1.28.454.303 1.032.455 1.735.455.702 0 1.273-.138 1.714-.413.44-.29.723-.64.847-1.054H50.3a4.744 4.744 0 01-.95 2.024 4.646 4.646 0 01-1.797 1.343c-.716.317-1.535.475-2.457.475zM31 17.612V6.397h2.87v6.879l-.66-2.129c0-1.611.344-2.83 1.033-3.656.688-.826 1.7-1.239 3.036-1.239h.587v2.5c-1.125 0-2.546.107-3.405.945-.523.509-.59 1.092-.59 2.07v5.845H31zM2 6.597c0-.745.56-1.575 1.25-1.854l4.594-1.856V9.19L2 11.55V6.598zM2 12.905l5.844-2.361v6.302l-4.593 1.856c-.69.28-1.25-.098-1.25-.843v-4.954z"
          fill="#fff"
        />
        <path
          d="M9.096 10.034l5.843-2.361v6.302l-5.843 2.361v-6.302z"
          fill="#E7C100"
        />
        <path
          d="M9.096 2.383L13.689.527c.69-.278 1.25.099 1.25.844v4.954l-5.843 2.36V2.384z"
          fill="#fff"
        />
        <path
          d="M9.08 17.688l5.843-2.36v6.302l-4.594 1.855c-.69.28-1.25-.098-1.25-.843v-4.954zM16.188 7.153l4.593-1.856c.69-.279 1.25.099 1.25.843v4.954l-5.843 2.361V7.153zM16.174 14.81l5.843-2.362v4.954c0 .745-.56 1.575-1.25 1.854l-4.593 1.855V14.81z"
          fill="#E7C100"
        />
      </svg>
    )
  }
)

/**
 * A component that displays the renoun logo that links to the renoun website.
 * @internal
 */
export const RenounLogoLink = styled(
  ({
    className,
    style,
  }: {
    className?: string
    style?: React.CSSProperties
  }) => (
    <a
      href="https://www.renoun.dev"
      rel="noopener"
      target="_blank"
      className={className}
      style={style}
    >
      <RenounLogo style={{ width: undefined, height: '100%' }} />
    </a>
  ),
  { display: 'flex' }
)

/**
 * A component that displays a "Built with renoun" message.
 * @internal
 */
export const BuiltWithRenoun = styled(
  ({
    className,
    style,
  }: {
    className?: string
    style?: React.CSSProperties
  }) => (
    <a href="https://www.renoun.dev" className={className} style={style}>
      <span>Built with</span>
      <RenounLogo />
    </a>
  ),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25lh',
  }
)
