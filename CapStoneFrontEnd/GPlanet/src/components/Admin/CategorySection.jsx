import { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategories } from "../../redux/actions/category";
import ModalAdd from "./ModalAdd";
import { toast } from "react-toastify";

const CategorySection = () => {
    const update = useSelector(state => state.update);
    const [categories, setCategories] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            if (response) {
                const sortedCategories = response.sort((a, b) => a.id - b.id);
                setCategories(sortedCategories);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleAdd = async (catName) => {
        toast.promise(
            (async () => {
                const response = await addCategory(catName);
                if (!response.success) {
                    throw new Error(response.message);
                }
                return response.message;
            })(),
            {
                pending: "Caricamento in corso...",
                success: "Categoria caricata con successo!",
                error: "Si è verificato un errore durante il caricamento."
            }
        ).then(() => {
            dispatch({ type: "UPDATE" });
        });
    }

    useEffect(() => {
        fetchCategories();
    }, [update]);
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-white">Gestione Categorie</h2>
                <button className="custom-button py-2" onClick={() => setModalShow(true)}>Aggiungi nuova categoria</button>
            </div>
            {categories && <CategoryTable categories={categories} />}
            <ModalAdd show={modalShow} onHide={() => setModalShow(false)} handleAdd={handleAdd} />
        </div>
    );
}

export default CategorySection;