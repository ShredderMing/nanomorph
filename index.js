const assert = require('nanoassert')
const morph = require('./lib/morph')

const TEXT_NODE = 3

module.exports = nanomorph

function nanomorph (oldTree, newTree, options) {
  assert.equal(typeof oldTree, "object", "nanomorph: oldTree should be an object")
  assert.equal(typeof newTree, "object", "nanomorph: newTree should be an object" )

  if (options && options.childrenOnly) {
    updateChildren(newTree, oldTree)
    return oldTree
  }

  assert.notEqual(
    newTree.nodeType,
    11,
    "nanomorph: newTree should have one root node (which is not a DocumentFragment)"
  )

  return walk(newTree, oldTree)
}

function walk (newNode, oldNode) {
  if (!oldNode) {
    return newNode
  } else if (!newNode) {
    return null
  } else if (newNode.isSameNode && newNode.isSameNode(oldNode)) {
    return oldNode
  } else if (newNode.tagName !== oldNode.tagName || getComponentId(newNode) !== getComponentId(oldNode)) {
    return newNode
  } else {
    morph(newNode, oldNode)
    updateChildren(newNode, oldNode)
    return oldNode
  }
}

function getComponentId (node) {
  return node.dataset ? node.dataset.nanomorphComponentId : undefined
}

function updateChildren (newNode, oldNode) {

}
