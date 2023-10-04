const BreadCumb = ({ title }) => {
    return (
        <div className="bg-white shadow">
            <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold tracking-tight text-gray-900">{title}</h1>
            </div>
        </div>
    );
};

export default BreadCumb;