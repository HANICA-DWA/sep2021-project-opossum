import React from 'react'
import '../styles.css'
import SlidingPane from 'react-sliding-pane'
import 'react-sliding-pane/dist/react-sliding-pane.css'
import { useDispatch, useSelector } from 'react-redux'
import { OpenSliderButton } from './OpenSliderButton'
import { closeSlider, selectSliderIsOpen } from '../services/sliderSlice'

const Slider = function () {
  const isOpen = useSelector(selectSliderIsOpen)
  const dispatch = useDispatch()
  return (
    <>
      <OpenSliderButton />
      <SlidingPane
        closeIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 18 18"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        }
        isOpen={isOpen}
        title={
          <div className="grid grid-cols-6 rounded-l">
            <div className="col-span-5">
              <p className="text-base font-medium text-gray-900">My snapshot</p>
              <p className="mt-1 text-sm text-gray-500">1 jan 2021</p>
            </div>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" flex justify-center"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        }
        from="left"
        onRequestClose={() => dispatch(closeSlider())}
        width="400px"
      >
        <div className=" bg-gray-400 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="210"
            height="150"
            viewBox="0 0 210 150"
          >
            <defs>
              <path
                d="M6.824 0C3.15 0 .17 2.98.17 6.655V149.23h177.75V22.493c0-3.676-2.98-6.655-6.655-6.655H74.523C55.443 15.838 60.786 0 41.918 0H6.824z"
                id="a"
              />
              <linearGradient
                x1="-3.406%"
                y1="60.065%"
                x2="73.351%"
                y2="9.946%"
                id="b"
              >
                <stop stopColor="#E8EAEE" offset="0%" />
                <stop stopColor="#CBD0D7" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <mask id="c" fill="#fff">
                <use xlinkHref="#a" />
              </mask>
              <use fill="#EBECF0" xlinkHref="#a" />
              <path
                d="M35 45S-6.197 46.197-3.35 84.35v65.653h188.356L133.5 45.5 35 45z"
                fill="url(#b)"
                mask="url(#c)"
              />
              <path
                d="M31.12 47.863c.486-1.58 2.223-2.863 3.876-2.863h172.008c1.655 0 2.603 1.277 2.115 2.863L178 149H0L31.12 47.863z"
                fill="#F4F5F7"
              />
            </g>
          </svg>
        </div>
      </SlidingPane>
    </>
  )
}

export { Slider }
