
import "./MainNavigation.css";

let compactClass = "__compact";

const MainNavList = ({compact, ...rest}) => {


  console.log('MainNavList Rendered...', compact)
  return (
    <a href="/" {...rest} className="text-gray-500 ">
      <li className={"fade200ms nav-list_item hover:text-black " + (compact ? compactClass : "")} id={rest.id}>
        <span className={(compact ? compactClass : "")}>
          {rest.children}          
          </span>
        <span className={"nav-list_text" + (compact ? compactClass : "")}>
          {rest.listtext}
          </span>
      </li>
    </a>
  )
}

export default MainNavList
