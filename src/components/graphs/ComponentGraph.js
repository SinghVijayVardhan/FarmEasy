import { Link } from "react-router-dom";
import React from "react";

export default function GraphComponent({ product, theme }) {
    return (
        <Link to={`GraphDraw/${product.id}`} >
            <div className="card">
                <div className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                    data-mdb-ripple-color="light">
                    <img src={product.image}
                        className="w-100" style={{width:'100%',height:'250px'}} />
                    <a href="#!">
                        <div className="mask">
                            <div className="d-flex justify-content-start align-items-end h-100">
                                <h5><span className="badge bg-success ms-2">FarmEasy</span></h5>
                            </div>
                        </div>
                        <div className="hover-overlay">
                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}></div>
                        </div>
                    </a>
                </div>
                <div className="card-body">
                    <a href="" className="text-reset">
                        <h5 className="card-title mb-3">{product.name.toUpperCase()}</h5>
                    </a>
                </div>
            </div>
        </Link>
    );
}