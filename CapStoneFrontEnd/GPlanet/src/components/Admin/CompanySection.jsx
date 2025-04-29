import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompany, getCompanies } from "../../redux/actions/company";
import CompanyTable from "./CompanyTable";
import ModalAdd from "./ModalAction";
import { toast } from "react-toastify";

const CompanySection = () => {
    const update = useSelector(state => state.update);
    const [companies, setCompanies] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    const fetchCompanies = async () => {
        try {
            const response = await getCompanies();
            if (response) {
                setCompanies(response);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleAdd = async (compName) => {
        toast.promise(
            (async () => {
                const response = await addCompany(compName);
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.message;
            })(),
            {
                pending: "Caricamento in corso...",
                success: "Compagnia caricata con successo!",
                error: "Si è verificato un errore durante il caricamento."
            }
        ).then(() => {
            dispatch({ type: "UPDATE" });
        });
    }

    useEffect(() => {
        fetchCompanies();
    }, [update]);
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-white">Gestione Compagnie</h2>
                <button className="custom-button py-2" onClick={() => setModalShow(true)}>Aggiungi nuova compagnia</button>
            </div>
            {companies && <CompanyTable companies={companies} />}
            <ModalAdd show={modalShow} onHide={() => setModalShow(false)} handleAction={handleAdd} />
        </div>
    );
}

export default CompanySection;