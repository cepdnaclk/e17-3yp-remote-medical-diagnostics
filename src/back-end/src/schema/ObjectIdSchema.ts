import * as yup from 'yup';
import { ObjectId } from 'bson';

export default class ObjectIdSchema extends yup.MixedSchema {
    constructor() {
        super({ type: 'objectId' });

        this.withMutation(schema => {
            schema.transform(function (value) {
                if (this.isType(value)) return value;
                return new ObjectId(value);
            });
        });
    }

    // _typeCheck(value: ObjectId) {
    //     return ObjectId.isValid(value);
    // }
}

