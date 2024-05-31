// import React from "react";
import { motion } from "framer-motion";

import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Popup = ({ station, onClose, handledirection, handleremove }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            id="toggle"
            key={station.stationName}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className={`fixed  bottom-0 left-0 w-full ${
                station.type === "ev" ? "bg-cosgreen" : "bg-blue-500"
            } p-4 z-50 shadow-lg text-white `}
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
                        onClick={() => {
                            navigate(`/station/${parseInt(station?.id)}`);
                        }}
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
                <button onClick={handledirection}>directions</button>
                <button
                    onClick={() => {
                        handleremove();
                        onClose();
                    }}
                    className="text-red-500 font-bold"
                >
                    Close
                </button>
            </div>
        </motion.div>
    );
};

Popup.propTypes = {
    station: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    handledirection: PropTypes.func.isRequired,
    handleremove: PropTypes.func.isRequired,
};

Popup.propTypes = {
    station: PropTypes.shape({
        stationName: PropTypes.string.isRequired,
        stationAddress: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

Popup.propTypes = {
    station: PropTypes.shape({
        stationName: PropTypes.string.isRequired,
        stationAddress: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Popup;
