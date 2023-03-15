import * as yup from 'yup'
import IFavoritar from '../interfaces/Favoritar'

interface IBodyProps extends Omit<IFavoritar, 'id'> { }

export const favoritarBodyValidation: yup.SchemaOf<IBodyProps> = yup.object().shape({


    id_catador: yup.string().uuid(),
    id_gerador: yup.string().uuid()

})