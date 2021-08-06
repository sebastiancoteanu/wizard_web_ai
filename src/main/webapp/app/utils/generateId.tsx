import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789', 15);
const generateId = () => Number(nanoid());

export default generateId;
