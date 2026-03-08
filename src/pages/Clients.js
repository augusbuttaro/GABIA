import ClientsGrid from "../components/ClientsGrid";


const Clients = () => {
    return (
        <div className="w-full relative overflow-hidden">
            <div className="relative z-10">
                <ClientsGrid />
            </div>
        </div>
    );
};

export default Clients;