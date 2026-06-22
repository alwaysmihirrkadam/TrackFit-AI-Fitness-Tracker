import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='pt-18 z-10'>
      <section className="relative w-full min-h-screen">

        <img
          src="Hero.png"
          alt=""
          className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
    "
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div
          className="
      relative
      z-10
      min-h-screen
      flex
      items-center
      px-5
      md:px-12
    "
        >
          <div
            className="
        text-white
        max-w-3xl
      "
          >
            <h1
              className="
          text-4xl
          md:text-6xl
          font-bold
          mb-6
          leading-tight
        "
            >
              TRAIN SMARTER,
              <br />
              BECOME STRONGER.
            </h1>

            <p
              className="
          text-sm
          md:text-lg
          text-gray-300
          leading-7
          mb-8
        "
            >
              TrackFit helps you stay consistent,
              monitor your performance and understand
              your progress through powerful workout
              analytics. Log workouts, track calories,
              measure strength gains and visualize your
              fitness journey.
            </p>

            <div
              className="
          flex
          flex-col
          sm:flex-row
          gap-4
        "
            >
              <button
                onClick={() => navigate("/register")}
                className="
            bg-blue-600
            hover:bg-blue-700
            px-8
            py-3
            rounded-xl
            font-semibold
          "
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/login")}
                className="
            border
            border-white
            px-8
            py-3
            rounded-xl
            font-semibold
            hover:bg-white
            hover:text-black
            transition
          "
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home