// category card

function Card(props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 mx-3 h-50 my-2">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0">
          <img
            src={props.url}
            className="w-40 h-25 rounded-xl object-cover ring-2 ring-gray-100"
            alt={props.Name}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-emerald-900 mb-5 truncate">
            {props.Name}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span className="font-medium mr-1">Listings:</span>
              <span>{props.NumberofCompanies}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="font-medium mr-1">Categories:</span>
              <span>{props.NumberofSub}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
        {/* <div>
          <button
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            aria-label="Edit"
          >
            <i className="ri-add-circle-line text-xl"></i>
          </button>
        </div> */}
        <button
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          aria-label="Edit"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          aria-label="Delete"
          onClick={() => props.onDelete(props.DBid)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export { Card };
