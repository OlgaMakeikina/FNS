import React from "react";
import "../lifehacks/ArticleFull.css";

const ChildCitizenshipBrazil = () => {
  return (
    <div className="article-full">
      <h1 className="article-title">
        Как оформить гражданство Бразилии для ребёнка до 10 лет
      </h1>

      <p className="article-text">
        Если у вас есть вид на жительство (RNM) в Бразилии, вы можете подать заявку на временное гражданство для своего ребёнка младше 10 лет. Процесс проходит онлайн через портал gov.br, и эта инструкция поможет вам разобраться в каждом шаге.
      </p>

      <h3 className="article-section-title">1. Начало процесса на портале gov.br</h3>
      <p className="article-text">
        Для подачи заявки вам понадобится аккаунт на сайте <a href="https://www.gov.br/pt-br/servicos/solicitar-naturalizacao" target="_blank" rel="noopener noreferrer">gov.br</a>. Вы можете использовать свою учётную запись или создать отдельную для ребёнка — это удобно, если детей несколько.
      </p>
      <ul className="article-list">
        <li>Кликните на кнопку «Iniciar».</li>
        <li>Введите CPF ребёнка в соответствующее поле.</li>
        <li>В разделе «Tipo da Solicitação» выберите вариант «Provisória» (временная натурализация).</li>
        <li>Отметьте галочку «Estou ciente da informação acima» внизу.</li>
        <li>Нажмите «AVANÇAR», чтобы перейти к следующему шагу.</li>
      </ul>

      <h3 className="article-section-title">2. Указание данных ребёнка</h3>
      <p className="article-text">
        На этом этапе заполните информацию о ребёнке, который претендует на гражданство:
      </p>
      <ul className="article-list">
        <li><strong>Nome</strong>: имя ребёнка.</li>
        <li><strong>Sobrenome</strong>: фамилия ребёнка.</li>
        <li><strong>Sexo</strong>: пол (Masculino для мальчика, Feminino для девочки).</li>
        <li><strong>País de nascimento</strong>: страна, где родился ребёнок.</li>
        <li><strong>País de nacionalidade</strong>: текущее гражданство ребёнка (например, русский).</li>
        <li><strong>Data de nascimento</strong>: дата рождения.</li>
        <li><strong>Filho de (nome do pai)</strong>: имя и фамилия отца.</li>
        <li><strong>Filho de (nome da mãe)</strong>: имя и фамилия матери.</li>
      </ul>
      <p className="article-text">
        Контактные данные обычно подтягиваются автоматически. Если этого не произошло, введите их вручную.
      </p>

      <h3 className="article-section-title">3. Информация о законном представителе</h3>
      <p className="article-text">
        Теперь укажите свои данные как родителя или опекуна, подающего заявку:
      </p>
      <ul className="article-list">
        <li><strong>Nome do Representante Legal</strong>: ваше имя.</li>
        <li><strong>Sobrenome do Representante Legal</strong>: ваша фамилия.</li>
        <li><strong>Qualidade de</strong>: ваша роль (мама, папа, опекун, другое).</li>
        <li><strong>País de nascimento</strong>: страна, где вы родились.</li>
        <li><strong>País de nacionalidade</strong>: ваше гражданство.</li>
        <li><strong>Data de nascimento</strong>: ваша дата рождения.</li>
        <li><strong>Filho de (nome do pai)</strong>: имя и фамилия вашего отца.</li>
        <li><strong>Filho de (nome da mãe)</strong>: имя и фамилия вашей матери.</li>
        <li><strong>Estado Civil</strong>: семейное положение (не женат/не замужем, женат/замужем, разведён(а), вдовец/вдова, гражданский союз).</li>
        <li><strong>Profissão</strong>: ваша профессия (любая).</li>
        <li><strong>CEP</strong>: почтовый индекс (должен совпадать с адресом в декларации).</li>
        <li><strong>UF</strong>: штат проживания.</li>
        <li><strong>Cidade</strong>: город.</li>
        <li><strong>Bairro</strong>: район.</li>
        <li><strong>Endereço</strong>: улица и номер дома.</li>
        <li><strong>Complemento</strong>: номер квартиры (если есть).</li>
        <li><strong>Telefone 1</strong>: ваш телефон.</li>
        <li><strong>Telefone 2</strong>: дополнительный контакт (опционально).</li>
        <li><strong>Email</strong>: ваш email.</li>
      </ul>

      <h3 className="article-section-title">4. Подготовка и загрузка документов</h3>
      <p className="article-text">
        Все документы загружаются в формате PDF через портал:
      </p>
      <ul className="article-list">
        <li>Ваш загранпаспорт (сканируйте весь документ одним файлом, подпишите как «Passaporte do representante»).</li>
        <li>Ваша карточка RNM (обе стороны в одном файле).</li>
        <li>Декларация о резиденции или договор аренды с указанием ребёнка.</li>
      </ul>
      <p className="article-text">
        Дополнительно для ребёнка:
      </p>
      <ul className="article-list">
        <li>Карточка RNM ребёнка (обе стороны одним файлом).</li>
        <li>CPF родителя и ребёнка со статусом Regular (проверьте здесь: <a href="https://servicos.receita.fazenda.gov.br/servicos/cpf/consultasituacao/consultapublica.asp" target="_blank" rel="noopener noreferrer">ссылка</a>).</li>
        <li>Бразильское свидетельство о рождении ребёнка (если выдано).</li>
        <li>Российское свидетельство о рождении с переводом (сканируйте одним файлом).</li>
        <li>Загранпаспорт ребёнка (весь документ одним файлом).</li>
        <li>Счёт за коммунальные услуги (свет, газ, интернет) не старше 3 месяцев.</li>
        <li>Справка из школы или садика (обязательно для детей старше 4 лет).</li>
      </ul>
      <p className="article-text">
        Если второй родитель с RNM находится в Бразилии, приложите его паспорт и RNM.
      </p>

      <h3 className="article-section-title">5. Ожидание решения и визит в Polícia Federal</h3>
      <p className="article-text">
        После отправки заявки:
      </p>
      <ul className="article-list">
        <li>Дождитесь ответа от Polícia Federal. При ошибках вас попросят исправить или дополнить документы.</li>
        <li>Вас вызовут с ребёнком в офис для сдачи биометрии (фото и отпечатки). Возьмите с собой основные документы.</li>
        <li>Заявка отправится в Минюст, где её рассмотрят в течение 180 рабочих дней.</li>
      </ul>
      <p className="article-text">
        При смене адреса до передачи дела в Минюст обновите данные в Polícia Federal (новая декларация и счёт). Полиция может неожиданно проверить ваш дом: наличие школьных принадлежностей, меддокументов или опросить соседей.
      </p>

      <h3 className="article-section-title">6. Получение и подтверждение гражданства</h3>
      <p className="article-text">
        После одобрения:
      </p>
      <ul className="article-list">
        <li>Ребёнок получает временное гражданство.</li>
        <li>В течение года оформите RG (бразильский паспорт) в местной инстанции.</li>
        <li>После достижения 18 лет (или 16 при особых условиях) ребёнок должен подтвердить гражданство на постоянное в течение 2 лет, иначе оно аннулируется к 20 годам.</li>
        <li>На собеседовании ребёнок обязан говорить на португальском без помощи переводчика.</li>
      </ul>

    </div>
  );
};

export default ChildCitizenshipBrazil;