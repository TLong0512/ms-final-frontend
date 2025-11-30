import api from '@/services/config/APIConfig';
import BaseAPI from '@/services/base/BaseAPI';

class TodosAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = 'todos';
  }

  /**
   * Hàm kiểm tra trùng lặp theo nghiệp vụ riêng
   * @param {*} payload
   * @returns
   */
  checkDuplicate(payload) {
    return api.post(`${this.controller}/check-duplicate`, payload);
  }
}

export default new TodosAPI();
