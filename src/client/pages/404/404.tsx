import { useTranslation } from 'react-i18next'

export const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-indigo-600 font-bold text-3xl">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t(`front.404.Page not found`)}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {t(`front.404.Sorry, we couldn’t find the page you’re looking for.`)}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            type="button"
            onClick={() => {
              window.location.replace('/')
            }}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t(`front.404.Go back home`)}
          </button>
        </div>
      </div>
    </div>
  )
}
