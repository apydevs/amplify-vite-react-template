import {useNavigate} from "react-router-dom";

export default function BackPage() {
    const navigate = useNavigate();

    function back() {
        navigate(-1);
    }

    return (
        <div className="cursor-pointer" onClick={back}>Back</div>
    );
}