

import PropTypes from "prop-types";

function AreaPopup({ data, onClose }) {
    return (
        <div
            id="toggle"
            key={data}
         
            className="fixed bottom-0 left-0 w-full bg-white p-4 z-50 shadow-lg"
        >
            <div className="flex justify-between items-center">
                <div>
                    <motion.h3
                        key={data.formatted}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg font-bold"
                    >
                        {data.formatted}
                    </motion.h3>
                    <motion.p
                        key={data.components.state}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm"
                    >
                        {data.components.state}
                    </motion.p>
                </div>
                <button onClick={onClose} className="text-red-500 font-bold">
                    Close
                </button>
            </div>
        </div>
    );
}

AreaPopup.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AreaPopup;
