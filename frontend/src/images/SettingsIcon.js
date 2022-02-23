import * as React from "react";

/**
 * Generates the image component for the settings icon on the side navigation.
 * Needed so the .svg can be recolored on hover/interaction.
 */
function SettingsIcon(props) {
  return (
    <svg
      width={21}
      height={23}
      viewBox="0 0 21 23"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <path d="M20.5781 14.2759L18.979 12.9087C19.0547 12.4448 19.0938 11.9712 19.0938 11.4976C19.0938 11.0239 19.0547 10.5503 18.979 10.0864L20.5781 8.71924C20.6987 8.61598 20.7851 8.47846 20.8256 8.32495C20.8662 8.17144 20.8591 8.00922 20.8052 7.85986L20.7832 7.79639C20.343 6.56598 19.6838 5.42538 18.8374 4.42969L18.7935 4.37842C18.6908 4.25769 18.5539 4.17091 18.401 4.12951C18.248 4.08811 18.0861 4.09402 17.9365 4.14648L15.9517 4.85205C15.2192 4.25146 14.4014 3.77783 13.5176 3.4458L13.1343 1.37061C13.1054 1.21446 13.0296 1.07081 12.9171 0.958735C12.8046 0.846663 12.6607 0.771476 12.5044 0.743164L12.4385 0.730957C11.1665 0.501465 9.82862 0.501465 8.55665 0.730957L8.49073 0.743164C8.33447 0.771476 8.19052 0.846663 8.07802 0.958735C7.96551 1.07081 7.88976 1.21446 7.86084 1.37061L7.4751 3.45557C6.59837 3.78767 5.78191 4.26105 5.05811 4.85693L3.0586 4.14648C2.9091 4.09361 2.74705 4.08748 2.59399 4.1289C2.44092 4.17033 2.30409 4.25736 2.20167 4.37842L2.15772 4.42969C1.31237 5.42608 0.653267 6.5665 0.211919 7.79639L0.189946 7.85986C0.080083 8.16504 0.170415 8.50683 0.416997 8.71924L2.03565 10.1011C1.95997 10.5601 1.92334 11.0288 1.92334 11.4951C1.92334 11.9639 1.95997 12.4326 2.03565 12.8892L0.416997 14.271C0.296381 14.3743 0.210055 14.5118 0.169497 14.6653C0.128939 14.8188 0.136072 14.981 0.189946 15.1304L0.211919 15.1938C0.653814 16.4243 1.30811 17.5596 2.15772 18.5605L2.20167 18.6118C2.30434 18.7325 2.44118 18.8193 2.59415 18.8607C2.74713 18.9021 2.90905 18.8962 3.0586 18.8437L5.05811 18.1333C5.78565 18.7314 6.59864 19.2051 7.4751 19.5347L7.86084 21.6196C7.88976 21.7758 7.96551 21.9194 8.07802 22.0315C8.19052 22.1436 8.33447 22.2188 8.49073 22.2471L8.55665 22.2593C9.84031 22.49 11.1548 22.49 12.4385 22.2593L12.5044 22.2471C12.6607 22.2188 12.8046 22.1436 12.9171 22.0315C13.0296 21.9194 13.1054 21.7758 13.1343 21.6196L13.5176 19.5444C14.401 19.2133 15.2235 18.7381 15.9517 18.1382L17.9365 18.8437C18.086 18.8966 18.2481 18.9028 18.4011 18.8613C18.5542 18.8199 18.691 18.7329 18.7935 18.6118L18.8374 18.5605C19.687 17.5571 20.3413 16.4243 20.7832 15.1938L20.8052 15.1304C20.915 14.8301 20.8247 14.4883 20.5781 14.2759ZM17.2456 10.3745C17.3066 10.7432 17.3384 11.1216 17.3384 11.5C17.3384 11.8784 17.3066 12.2568 17.2456 12.6255L17.0845 13.6045L18.9082 15.1645C18.6317 15.8015 18.2828 16.4044 17.8682 16.9614L15.6025 16.1582L14.8359 16.7881C14.2524 17.2666 13.603 17.6426 12.8999 17.9062L11.9697 18.2554L11.5327 20.6235C10.8432 20.7017 10.147 20.7017 9.45752 20.6235L9.02051 18.2505L8.09766 17.8965C7.40186 17.6328 6.75489 17.2568 6.17627 16.7808L5.40967 16.1484L3.1294 16.959C2.71436 16.3999 2.36768 15.7969 2.08936 15.1621L3.93262 13.5874L3.77393 12.6108C3.71534 12.2471 3.6836 11.8711 3.6836 11.5C3.6836 11.1265 3.7129 10.7529 3.77393 10.3892L3.93262 9.4126L2.08936 7.83789C2.36524 7.20068 2.71436 6.6001 3.1294 6.04101L5.40967 6.85156L6.17627 6.21924C6.75489 5.74316 7.40186 5.36719 8.09766 5.10351L9.02295 4.75439L9.45997 2.38135C10.146 2.30322 10.8467 2.30322 11.5352 2.38135L11.9722 4.74951L12.9023 5.09863C13.603 5.3623 14.2549 5.73828 14.8384 6.2168L15.605 6.84668L17.8706 6.04346C18.2857 6.60254 18.6323 7.20557 18.9106 7.84033L17.0869 9.40039L17.2456 10.3745ZM10.5 6.95898C8.12696 6.95898 6.20313 8.88281 6.20313 11.2559C6.20313 13.6289 8.12696 15.5527 10.5 15.5527C12.8731 15.5527 14.7969 13.6289 14.7969 11.2559C14.7969 8.88281 12.8731 6.95898 10.5 6.95898ZM12.4336 13.1895C12.18 13.4438 11.8786 13.6455 11.5468 13.7829C11.2149 13.9203 10.8592 13.9908 10.5 13.9902C9.77002 13.9902 9.08399 13.7046 8.56641 13.1895C8.31207 12.9358 8.11039 12.6344 7.97296 12.3026C7.83553 11.9708 7.76507 11.615 7.76563 11.2559C7.76563 10.5259 8.05127 9.83984 8.56641 9.32226C9.08399 8.80469 9.77002 8.52148 10.5 8.52148C11.23 8.52148 11.916 8.80469 12.4336 9.32226C12.6879 9.57587 12.8896 9.87727 13.027 10.2091C13.1645 10.5409 13.2349 10.8967 13.2344 11.2559C13.2344 11.9858 12.9487 12.6719 12.4336 13.1895Z" />
    </svg>
  );
}

export default SettingsIcon;