import React from "react";
import { motion } from "framer-motion";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Popup = ({ station, onClose }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            id="toggle"
            key={station.stationName}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 w-full bg-cosgreen p-4 z-50 shadow-lg text-white"
        >
            <div className="flex justify-between items-center">
                <div>
                    <motion.h3
                        key={station.stationName}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg font-bold"
                        onClick={() =>
                            navigate(`/station/${parseInt(station?.id)}`)
                        }
                    >
                        {station.stationName}
                    </motion.h3>
                    <motion.p
                        key={station.stationAddress}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm"
                    >
                        {station.stationAddress}
                    </motion.p>
                </div>
                <button onClick={onClose} className="text-red-500 font-bold">
                    Close
                </button>
            </div>
        </motion.div>
    );
};

Popup.propTypes = {
    station: PropTypes.shape({
        stationName: PropTypes.string.isRequired,
        stationAddress: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Popup;
