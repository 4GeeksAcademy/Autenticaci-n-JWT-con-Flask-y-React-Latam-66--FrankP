import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
// Ajustamos el import para que apunte al archivo store.js que está en src/front/
import * as StoreModule from "../store";
const Context = StoreModule.Context || StoreModule.default;

export const Single = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();

    return (
        <div className="text-center mt-5">
            {/* Verificamos que 'store.demo' exista antes de acceder para evitar errores */}
            <h1>
                Detalle: {store.demo && store.demo[params.theid] ? store.demo[params.theid].title : "Cargando..."}
            </h1>
            <hr className="my-4" />
            <Link to="/">
                <span className="btn btn-primary btn-lg" role="button">
                    Volver al inicio
                </span>
            </Link>
        </div>
    );
};

Single.propTypes = {
    match: PropTypes.object
};