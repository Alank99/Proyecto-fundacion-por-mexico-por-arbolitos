export const spanishMessages= {
    ra: {
        action: {
            add_filter: 'Añadir filtro',
            add: 'Añadir',
            back: 'Regresar',
            bulk_actions: 'Un objeto seleccionado |||| %{smart_count} objectos seleccionados',
            cancel: 'Cancelar',
            clear_array_input: 'Borrar la lista',
            clear_input_value: 'Borrar el valor',
            clone: 'Clonar',
            confirm: 'Confirmar',
            create: 'Crear',
            create_item: 'Crear %{item}',
            delete: 'Borrar',
            edit: 'Editar',
            export: 'Exportar',
            list: 'Listar',
            refresh: 'Refrescar',
            remove_filter: 'Remover este filtro',
            remove_all_filters: 'Remover todos los filtros',
            remove: 'Remover',
            save: 'Guardar',
            search: 'Buscar',
            select_all: 'Seleccionar todo',
            select_row: 'Seleccionar este fila',
            show: 'Mostrar',
            sort: 'Ordenar',
            undo: 'Deshacer',
            unselect: 'Deseleccionar',
            expand: 'Expandir',
            close: 'Cerrar',
            open_menu: 'Abrir menu',
            close_menu: 'Cerrar menu',
            update: 'Actualizar',
            move_up: 'Mover arriba',
            move_down: 'Mover abajo',
            open: 'Abrir',
            toggle_theme: 'Cambiar de Tema',
            select_columns: 'Columnas',
            update_application: 'Recargar Aplicación',
        },
        boolean: {
            true: 'Sí',
            false: 'No',
            null: ' ',
        },
        page: {
            create: 'Crear %{name}',
            dashboard: 'Tablero',
            edit: '%{name} %{recordRepresentation}',
            error: 'Algo salió mal',
            list: '%{name}',
            loading: 'Cargando',
            not_found: 'No encondrado',
            show: '%{name} %{recordRepresentation}',
            empty: '%{name} no existe aún.',
            invite: '¿Quieres añadir uno?',
        },
        input: {
            file: {
                upload_several:
                    'Arrastra tus archivos para subir, o haz clic para seleccionar uno.',
                upload_single: 'Arrastra un archivo para subir, o haz clic para seleccionarlo',
            },
            image: {
                upload_several:
                    'Arrastra tus imágenes para subirlas, o haz clic para seleccionar una.',
                upload_single:
                    'Arrastra tu imagen para subirla, o haz clic para seleccionarla.',
            },
            references: {
                all_missing: 'No se encontraron datos de referencia.',
                many_missing:
                    'Al menos una de las referencias asociadas ya no parece estar disponible.',
                single_missing:
                    'La referencia asociada ya no parece estar disponible.',
            },
            password: {
                toggle_visible: 'Esconder contraseña',
                toggle_hidden: 'Mostrar constraseña',
            },
        },
        message: {
            about: 'Acerca de',
            are_you_sure: '¿Estás seguro?',
            auth_error:
                'Se produjo un error al validar el token de autenticación.',
            bulk_delete_content:
                '¿Estás seguro que quieres borrar éste %{name}? |||| ¿Estás seguro que quieres borrar estos %{smart_count} objetos?',
            bulk_delete_title:
                'Borrar %{name} |||| Borrar %{smart_count} %{name}',
            bulk_update_content:
                '¿Estás seguro que quieres actualizar éste %{name}? |||| ¿Estás seguro que quieres actualizar estos %{smart_count} objetos?',
            bulk_update_title:
                'Actualizar %{name} |||| Actualizar %{smart_count} %{name}',
            clear_array_input: '¿Estás seguro que quieres limpiar toda la lista?',
            delete_content: '¿Estás seguro que quieres borrar éste objeto?',
            delete_title: 'Borrar %{name} #%{id}',
            details: 'Detalles',
            error:
                "Un error en el cliente ha ocurrido y su solucitud no pudo ser completada.",

            invalid_form: 'El formulario no es válido. Por favor revise si hay errores',
            loading: 'La página está cargando, un momento por favor',
            no: 'No',
            not_found:
                'Either you typed a wrong URL, or you followed a bad link.',
            yes: 'Sí',
            unsaved_changes:
                "Algunos de sus cambios no han sido guardados. ¿Estás seguro que quieres ignorarlos?",
        },
        navigation: {
            no_results: 'Sin resultados encontrados',
            no_more_results:
                'La página %{page} está fuera de sus límites. Trata la página anterior.',
            page_out_of_boundaries: 'Página número %{page} fuera de los límites',
            page_out_from_end: 'No puedes ir después de la última página',
            page_out_from_begin: 'No puedes ir antes de la primera página',
            page_range_info: '%{offsetBegin}-%{offsetEnd} de %{total}',
            partial_page_range_info:
                '%{offsetBegin}-%{offsetEnd} de más de %{offsetEnd}',
            current_page: 'Página %{page}',
            page: 'Ir a la página %{page}',
            first: 'Ir a la primera página',
            last: 'Ir a la última página',
            next: 'Ir a la siguiente página',
            previous: 'Ir a la página anterior',
            page_rows_per_page: 'Filas por página:',
            skip_nav: 'Saltar a contenido',
        },
        sort: {
            sort_by: 'Orderar por %{field} %{order}',
            ASC: 'ascendente',
            DESC: 'descendente',
        },
        auth: {
            auth_check_error: 'Por favor inicia sesión para continuar',
            user_menu: 'Perfil',
            username: 'Usuario',
            password: 'Contraseña',
            sign_in: 'Iniciar sesión',
            sign_in_error: 'Autenticación fallida, por favor vuelve a tratar',
            logout: 'Cerrar sesión',
        },
        notification: {
            updated: 'Elemento actualizado |||| %{smart_count} elementos actualizados',
            created: 'Elemento creado',
            deleted: 'Elemento borrado |||| %{smart_count} elemento borrado',
            bad_item: 'Elemento incorrecto',
            item_doesnt_exist: 'Elemento no existe',
            http_error: 'Error en la comunicación con el servidor',
            data_provider_error:
                'Error con el provedor de datos. Revise la consola para más detalles.',
            i18n_error:
                'No se pudo cargar la traducción para el lenguaje especificado',
            canceled: 'Acción cancelada',
            logged_out: 'Su sesión ha terminado, por favor vuelva a conectarse.',
            not_authorized: "No está autorizado su acceso a éste recurso.",
            application_update_available: 'Una nueva versión está disponible.',
        },
        validation: {
            required: 'Requerido',
            minLength: 'Debe de ser de %{min} caracteres por lo menos',
            maxLength: 'Debe de ser de  %{max} caracteres o menos',
            minValue: 'Debe de ser por lo menos %{min}',
            maxValue: 'Debe de ser %{max} o menos',
            number: 'Debe de ser un nombre',
            email: 'Debe de ser un correo electrónico válido',
            oneOf: 'Debe de ser uno de: %{options}',
            regex: 'Debe de corresponder con un formato específico (regexp): %{pattern}',
            unique: 'Debe de ser único',
        },
        saved_queries: {
            label: 'Consultas guardadas',
            query_name: 'Nombre de la consulta',
            new_label: 'Guardar la consulta actual...',
            new_dialog_title: 'Guardar la consulta actual como',
            remove_label: 'Remover la consulta guardada',
            remove_label_with_name: 'Remover la consulta "%{name}"',
            remove_dialog_title: '¿Remover la consulta guardada?',
            remove_message:
                '¿Estás seguro que quieres remover éste objeto de la lista de consultas guardadas?',
            help: 'Filtrar la lista y guardar esta consulta para después',
        },
        configurable: {
            customize: 'Personalizar',
            configureMode: 'Configuara ésta página',
            inspector: {
                title: 'Inspector',
                content: 'Coloca el cursor sobre los elementos de la interfaz para configurarla',
                reset: 'Restablecer la configuración',
                hideAll: 'Esconder todos',
                showAll: 'Mostrar todos',
            },
            Datagrid: {
                title: 'Cuádricula de datos',
                unlabeled: 'Columna sin etiquetar #%{column}',
            },
            SimpleForm: {
                title: 'Formulario',
                unlabeled: 'Entrada sin etiquetar #%{input}',
            },
            SimpleList: {
                title: 'Lista',
                primaryText: 'Texto primario',
                secondaryText: 'Texto secundario',
                tertiaryText: 'Texto terciario',
            },
        },
    },
};