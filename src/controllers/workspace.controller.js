import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/members_workspace_roles.js"
import members_workspace_repository from "../repositories/membersWorkspace.repository.js"
import workspaces_repository from "../repositories/workspace_repository.js"

class WorkspaceController {
    async create(request, response){
        try{
            const {name, description} = request.body
            const {id} = request.user 

            const workspace_created = await workspaces_repository.create({name, description, owner_id: id})
            await members_workspace_repository.create({
                workspace_id: workspace_created._id,
                user_id: id,
                role: AVAILABLE_ROLES_WORKSPACE_MEMBERS.ADMIN
            })
            response.status(201).json(
                {
                    ok: true, 
                    message:'Workspace creado exitosamente',
                    status: 201,
                    data: {}
                }
            )
        }
        catch(error){
            
            if(error.status){ 
                response.status(error.status).json(
                    {
                        message: error.message, 
                        status: error.status,
                        ok: false
                    }
                )
                return 
            }
            else{
                console.log('Hubo un error', error)
                response.status(500).json(
                    {
                        message: 'Error interno del servidor', 
                        ok: false
                    }
                )
            }
        }
    }
    async delete(request, response) {
        try {
            const workspace_id = request.params.workspace_id
            const user_id = request.user.id
            await workspaces_repository.deleteWorkspaceFromOwner(user_id, workspace_id)

            response.status(200).json(
                {
                    ok: true,
                    message: 'Workspace eliminado correctamente',
                    status: 200,
                    data: {}
                }
            )
            return
        } catch (error) {

            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        status: error.status,
                        ok: false
                    }
                )
                return
            } else {
                console.error('Hubo un error', error)
                response.status(500).json(
                    {
                        message: 'Error interno del servidor',
                        ok: false
                    }
                )
            }
        };
    }

    async getAllByMember (request, response){
        const {id} = request.user
        const workspaces = await members_workspace_repository.getAllByUserId(id)
        response.json({
            ok: true, 
            status: 200,
            message:'Lista de workspaces',
            data: {
                workspaces: workspaces
            }
        })
    }
}

const workspace_controller = new WorkspaceController
export default workspace_controller