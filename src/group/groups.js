import List from '../list/list'
import Group from './group'
import registry from '../registry/registry'

class Groups extends List {

  rootEl = null

  /**
   * Create a groups instance.
   * @param {HTMLElement} rootEl define the animation root
   * @param {Array} data
   */
  constructor(rootEl = document.body, data = []) {
    super(data, Group, [{ name: 'untitled' }])

    if (!(rootEl instanceof window.HTMLElement)) {
      throw new Error('No root element provided.')
    }
    this.rootEl = rootEl

    // add groups to registry
    this.each(g => registry.add(g))
  }

  /**
   * Add group to list and global registry
   * @param {Array|*} group
   * @returns {Array|*}
   */
  add(group) {
    const affected = super.add(group)

    Array.isArray(affected)
      ? affected.forEach(g => registry.add(g))
      : registry.add(affected)

    return affected
  }

  /**
   * Remove group from list and global registry
   * @param {Array|*} group
   * @returns {Array|*}
   */
  remove(group) {
    const affected = super.remove(group)

    Array.isArray(affected)
      ? affected.forEach(g => registry.remove(g))
      : registry.remove(affected)

    return affected
  }

  /**
   * Construct all groups
   * @returns {Promise}
   */
  construct() {
    return Promise.all(this.list.map(group => group.construct()))
  }

  /**
   * Get group by name
   * @param {string} name
   * @returns {Group|undefined}
   */
  get(name) {
    return this.list.find(group => group.name === name)
  }

}

export default Groups
