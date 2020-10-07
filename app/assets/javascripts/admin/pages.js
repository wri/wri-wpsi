// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener('paste', event => {
  remove_extra_paragraphs();
  replace_p_elems_inside_li();
});

function remove_extra_paragraphs() {
  edit_area = document.querySelector(".tox-edit-area")
  extra_paragraphs = edit_area.querySelectorAll('p');
  for(let i = 0; i < extra_paragraphs.length; i += 1) {
    if (extra_paragraphs[i].innerHTML === "&nbsp;") {
      console.log(extra_paragraphs[i])
      extra_paragraphs[i].remove()
    }
  }
}

function replace_p_elems_inside_li() {
  edit_area = document.querySelector(".tox-edit-area")
  li_elems = edit_area.querySelectorAll('li');
  for(let i = 0; i < li_elems.length; i += 1) {
    let children =  li_elems[i].children
    console.log(children)
    if (children.length === 1 && children[0].nodeName === 'P')
      var text_content = children[0].innerHTML;
      li_elems[i].innerHTML = text_content;
  }
}
