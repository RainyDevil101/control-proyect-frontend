const menuLinks = (userRole) => {

    const linksConfig = [
        { name: "Menu", to: "home-view", userRole: ["any"] },
        { name: "Reportes", to: "data-menu", userRole: ["PLANNER_ROLE", "ADMIN_ROLE"] },
        { name: "Administrador", to: "regist-user", userRole: ["ADMIN_ROLE"] },
        { name: "Despachos Pendientes", to: "menu-materials", userRole: ["PLANNER_ROLE", "OPERATOR_ROLE", "ADMIN_ROLE"] },
        { name: "Registro de Devolución de Materiales", to: "get-dispatch-refund", userRole: ["OPERATOR_ROLE"] },
        { name: "Devoluciones", to: "menu-refunds", userRole: ["REFUNDER_ROLE"] },
    ];

    const links = [];

    for (const link of linksConfig) {

        if (link.userRole.includes(userRole) || link.userRole.includes("any")) {
            links.push({
                ...link
            });
        }

    };

    return {
        links,
    }
};

export default menuLinks;