import React from 'react';
import styles from '@/styles/privacy.module.scss';
// import {useRouter} from 'next/router';
import Link from 'next/link';

const Privacy = () => {
    // const router = useRouter();

    return (
        <div className={styles.privacyWrapper}>
            <div className={styles.privacyContainer}>
                <div className={styles.privacyHeader}>
                    <span className={styles.privacyHeaderText}>
                        Политика конфиденциальности иобработки персональных данных
                    </span>
                    {/*<svg*/}
                    {/*    className={styles.goBack}*/}
                    {/*    onClick={() => router.back()}*/}
                    {/*    width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>*/}
                    {/*    <path d='M25 14.125L3 14.125M3 14.125L9.875 21M3 14.125L9.875 7.25' stroke='#FF0000'*/}
                    {/*          strokeWidth='2' strokeLinecap='square'/>*/}
                    {/*</svg>*/}
                </div>
                <div className={styles.privacyTexts}>
                    <span>
                        Настоящая Политика конфиденциальности персональных данных (далее – Политика конфиденциальности) действует в отношении всей информации, размещенной на официальном сайте интернет-магазина в сети Интернет по адресу shorinfond.com (далее – Сайт), и всех сервисов, размещенных на Сайте или указанных на нем в виде активных ссылок для перехода, которую Администрация и посетители Сайта могут получить о Пользователе во время его использования Сайта и его сервисов.
                    </span>
                    <span>
                        Использование сервисов Сайта означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки его персональных данных; в случае несогласия с этими условиями Пользователь должен воздержаться от использования сервисов.
                    </span>
                    <div className={styles.block}>
                        <span>1. ОБЩИЕ ПОЛОЖЕНИЯ</span>
                        <div className={styles.blockTexts}>
                            <span>
                                1.1. В рамках настоящей Политики под персональной информацией Пользователя понимаются:
                            </span>
                            <span>
                                1.1.1. Персональная информация, которую Пользователь предоставляет о себе самостоятельно при регистрации (создании учетной записи) или в процессе использования Сервисов (оформление заказа, подписка на рассылку, заполнение формы обратной связи и формы «Перезвоните мне»), включая персональные данные Пользователя. Обязательная для предоставления Сервисов информация помечена специальным образом. Иная информация предоставляется Пользователем на его усмотрение. К персональной информации, в частности, относятся: фамилия, имя, отчество, электронная почта, номер телефона, адрес.
                            </span>
                            <span>
                                1.1.2. Данные, которые автоматически передаются сервисам Сайта в процессе их использования с помощью установленного на устройстве Пользователя программного обеспечения, в том числе IP- адрес, данные файлов cookie, информация о браузере Пользователя (или иной программе, с помощью которой осуществляется доступ к сервисам), технические характеристики оборудования и программного обеспечения, используемых Пользователем, дата и время доступа к сервисам, адреса запрашиваемых страниц и иная подобная информация.
                            </span>
                            <span>
                                1.1.3. Настоящая Политика конфиденциальности применяется только к официальному сайту интернет-магазина в сети Интернет по адресу shorinfond.com (далее – Сайт), и всем его сервисам, размещенным на Сайте или указанным на нем в виде активных ссылок для перехода. Сайт shorinfond.com и все его сервисы, размещенные на Сайте или указанные на нем в виде активных ссылок для перехода не контролирует и не несет ответственности за сайты третьих лиц, на которые Пользователь может перейти по ссылкам, доступным на Сайте и всех его сервисах.
                            </span>
                            <span>
                                1.1.4. Настоящая Политика подготовлена в соответствии с п. 2 ч .1 ст. 18.1 Федерального закона Российской Федерации «О персональных данных» No152-ФЗ от 27 июля 2006 года (далее – «Закон»).
                            </span>
                            <span>
                                1.1.5. Настоящая Политика соответствует Регламенту No 2016/679 Европейского парламента и Совета Европейского Союза “О защите физических лиц при обработке персональных данных и о свободном обращении таких данных, а также об отмене Директивы 95/46/ЕС (Общий Регламент о защите персональных данных)” (принят в г. Брюсселе 27.04.2016).
                            </span>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <span>2. ЦЕЛИ ОБРАБОТКИ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЕЙ</span>
                        <div className={styles.blockTexts}>
                            <span>
                                2.1. Сайт собирает и хранит только ту персональную информацию, которая необходима для предоставления сервисов или исполнения соглашений и договоров с Пользователем, за исключением случаев, когда законодательством предусмотрено обязательное хранение персональной информации в течение определенного законом срока.
                            </span>
                            <span>
                                2.2. Персональную информацию Пользователя Сайт обрабатывает в следующих целях:
                            </span>
                            <span>
                                2.2.1. Идентификации Пользователя, зарегистрированного на Сайте, для предоставления ему информации об услугах Компании и услуг, если они предоставляются в электронном виде.
                            </span>
                            <span>
                                2.2.2. Предоставления Пользователю доступа к персонализированным ресурсам Сайта.
                            </span>
                            <div>
                                2.2.3. Установления с Пользователем обратной связи, включая направление уведомлений,
                                запросов, касающихся использования Сайта, оказания услуг, обработку запросов и заявок от
                                Пользователя.
                            </div>
                            <span>
                                2.2.4. Определения места нахождения Пользователя для обеспечения безопасности, предотвращения мошенничества.
                            </span>
                            <span>
                                2.2.5. Подтверждения достоверности и полноты персональных данных, предоставленных Пользователем.
                            </span>
                            <span>
                                2.2.6. Создания учетной записи для предоставления информации об услугах Компании и услуг, если они предоставляются в электронном виде, если Пользователь дал согласие на создание учетной записи.
                            </span>
                            <span>
                                2.2.7. Информирование Пользователя Сайта о проходящих в интернет-магазине акциях, распродажах и иных событиях путем персонализированной электронной рассылки, если Пользователь дал согласие на получение такой рассылки.
                            </span>
                            <span>
                                2.2.8. Предоставления Пользователю эффективной клиентской и технической поддержки при возникновении проблем, связанных с использованием Сайта.
                            </span>
                            <span>
                                2.2.9. Осуществления рекламной деятельности с согласия Пользователя.
                            </span>
                            <span>
                                2.2.10. Осуществление мероприятий по совершенствованию деятельности и улучшению качества обслуживания посетителей.
                            </span>
                            <span>
                                2.2.11. Исполнению договоров, в т. ч. заключенных дистанционным способом на Сайте, возмездного оказания услуг, предоставления услуг, а также учета оказанных Пользователю услуг для осуществления взаиморасчетов.
                            </span>
                            <span>
                                2.2.12. Осуществления иной деятельности в соответствии с Уставом Компании и законодательством, требующей получения от Пользователя Сайта персональных данных.
                            </span>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <span>3. УСЛОВИЯ ОБРАБОТКИ ПЕРСОНАЛЬНОЙ ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЕЙ И ЕЕ ПЕРЕДАЧИ ТРЕТЬИМ ЛИЦАМ</span>
                        <div className={styles.blockTexts}>
                            <span>
                                3.1. Сайт хранит персональную информацию Пользователей в соответствии с внутренними регламентами конкретных сервисов.
                            </span>
                            <span>
                                3.2. В отношении персональной информации Пользователя сохраняется ее конфиденциальность, кроме случаев добровольного предоставления Пользователем информации о себе для общего доступа неограниченному кругу лиц. При использовании отдельных сервисов Пользователь соглашается с тем, что определенная часть его персональной информации становится общедоступной.
                            </span>
                            <span>
                                3.3. Сайт вправе передать персональную информацию Пользователя третьим лицам в следующих случаях:
                            </span>
                            <span>
                                3.3.1. Передача необходима для использования Пользователем определенного сервиса либо для исполнения определенного соглашения или договора с Пользователем (услуги по доставке заказов посредством службы доставки до пункта самовывоза или по адресу, указанному Пользователем).
                            </span>
                            <span>
                                3.3.2. Передача предусмотрена российским или иным применимым законодательством в рамках установленной законодательством процедуры.
                            </span>
                            <span>
                                3.4. Обработка персональных данных Пользователя осуществляется без ограничения срока любым законным способом, в том числе в информационных системах персональных данных с использованием средств автоматизации или без использования таких средств. Обработка персональных данных Пользователей осуществляется в соответствии с Федеральным законом от 27.07.2006 N 152-ФЗ «О персональных данных». К операциям по обработке Данных относятся: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение Данных.
                            </span>
                            <span>
                                3.5. При утрате или разглашении персональных данных Администрация Сайта информирует Пользователя об утрате или разглашении персональных данных.
                            </span>
                            <span>
                                3.6. Администрация Сайта принимает необходимые организационные и технические меры для защиты персональной информации Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
                            </span>
                            <span>
                                3.7. Администрация Сайта совместно с Пользователем принимает все необходимые меры по предотвращению убытков или иных отрицательных последствий, вызванных утратой или разглашением персональных данных Пользователя.
                            </span>
                            <span>
                                3.8. Сроки обработки (хранения) Данных определяются исходя из целей обработки Данных, в соответствии со сроком действия договора с субъектом Данных, требованиями федеральных законов, требованиями операторов Данных, по поручению которых Компания осуществляет обработку Данных, основными правилами работы архивов организаций, сроками исковой давности. Данные, срок обработки (хранения) которых истек, должны быть уничтожены, если иное не предусмотрено федеральным законом. Хранение Данных после прекращения их обработки допускается только после их обезличивания.
                            </span>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <span>4. ОБЯЗАТЕЛЬСТВА СТОРОН</span>
                        <div className={styles.blockTexts}>
                            <span>
                                4.1. Пользователь обязан:
                            </span>
                            <span>
                                4.1.1. Предоставить информацию о персональных данных, необходимую для пользования Сайтом.
                            </span>
                            <span>
                                4.1.2. Обновлять, дополнять предоставленную информацию о персональных данных в случае изменения данной информации.
                            </span>
                            <span>
                                4.2. Администрация Сайта обязана:
                            </span>
                            <span>
                                4.2.1. Использовать полученную информацию исключительно для целей, указанных в настоящей Политике конфиденциальности.
                            </span>
                            <span>
                                4.2.2. Обеспечить хранение конфиденциальной информации в тайне, не разглашать без предварительного письменного разрешения Пользователя, а также не осуществлять продажу, обмен, опубликование либо разглашение иными возможными способами переданных персональных данных Пользователя, за исключением предусмотренных настоящей Политикой конфиденциальности.
                            </span>
                            <span>
                                4.2.3. Принимать меры предосторожности для защиты конфиденциальности персональных данных Пользователя согласно порядку, обычно используемому для защиты такого рода информации в существующем деловом обороте.
                            </span>
                            <span>
                                4.2.4. Осуществить блокирование персональных данных, относящихся к соответствующему Пользователю, с момента обращения или запроса Пользователя или его законного представителя либо уполномоченного органа по защите прав субъектов персональных данных на период проверки в случае выявления недостоверных персональных данных или неправомерных действий.
                            </span>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <span>5. ОТВЕТСТВЕННОСТЬ СТОРОН</span>
                        <div className={styles.blockTexts}>
                            <span>
                                5.1. Администрация Сайта, не исполнившая свои обязательства, несет ответственность за убытки, понесенные Пользователем в связи с неправомерным использованием персональных данных, в соответствии с законодательством Российской Федерации.
                            </span>
                            <span>
                                5.2. В случае утраты или разглашения конфиденциальной информации Администрация Сайта не несет ответственности, если данная конфиденциальная информация: 5.2.1. Стала публичным достоянием до ее утраты или разглашения.
                            </span>
                            <span>
                                5.2.2. Была получена от третьей стороны до момента ее получения Администрациеи Сайта.
                            </span>
                            <span>
                                5.2.3. Была разглашена с согласия Пользователя. 
                            </span>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <span>6. РАЗРЕШЕНИЕ СПОРОВ</span>
                        <div className={styles.blockTexts}>
                            <span>
                                6.1. До обращения в суд с иском по спорам, возникающим из отношений между Пользователем Сайта и Администрацией Сайта, обязательным является предъявление претензии (письменного предложения о добровольном урегулировании спора).
                            </span>
                            <span>
                                6.2. Получатель претензии в течение 20 календарных дней со дня получения претензии письменно уведомляет заявителя претензии о результатах рассмотрения претензии.
                            </span>
                            <span>
                                6.3. При недостижении соглашения спор будет передан на рассмотрение в суд в соответствии с действующим законодательством Российской Федерации.
                            </span>
                            <span>
                                6.4. К настоящей Политике конфиденциальности и отношениям между Пользователем и Администрацией Сайта применяется действующее законодательство Российской Федерации.
                            </span>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <span>7. ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ</span>
                        <div className={styles.blockTexts}>
                            <span>
                                7.1. Администрация Сайта вправе вносить изменения в настоящую Политику конфиденциальности без согласия Пользователя.
                            </span>
                            <span>
                                7.2. Новая Политика конфиденциальности вступает в силу с момента ее размещения на Сайте, если иное не предусмотрено новой редакцией Политики конфиденциальности.
                            </span>
                            <span>
                                7.3. Все предложения или вопросы по настоящей Политике конфиденциальности следует сообщать на форму обратной связи интернет-магазина, размещенную на странице <Link className={styles.link} target={'_blank'} href={'https://artsmuseumshop.ru/forms/obratnaya-svyaz'}>www.artsmuseumshop.ru/forms/obratnaya-svyaz</Link>.
                            </span>
                            <span>
                                7.4. Действующая Политика конфиденциальности размещена на странице по адресу: <Link className={styles.link} target={'_blank'} href={'https://shorinfond.com/privacy-policy/'}>https://shorinfond.com/privacy-policy/</Link>
                            </span>
                            <span>
                                7.5. Используя этот Сайт, Вы выражаете свое согласие с этой политикой. Если Вы не согласны с этой политикой, пожалуйста, не используйте наш Сайт. Ваше дальнейшее использование Сайта после внесения изменений в настоящую политику будет рассматриваться как Ваше согласие с этими изменениями.
                            </span>
                            <span>
                                7.6. Пользователь Сайта может в любое время отозвать свое согласие на обработку Данных, направив электронное письмо на почту, либо направив письменное уведомление по адресу Компании: 191186, Санкт-Петербург, Казанская, д.7, офис 301 А. После получения такого сообщения обработка Данных пользователя будет прекращена, а его Данные будут удалены, за исключением случаев, когда обработка может быть продолжена в соответствии с законодательством.
                            </span>
                            <span>
                                7.7. Компания не осуществляет обработку Данных, касающихся расовой, национальной принадлежности, политических взглядов, религиозных, философских и иных убеждений, интимной жизни, членства в общественных объединениях, в том числе в профессиональных союзах, биометрических данных (сведения, которые характеризуют физиологические и биологические особенности человека, на основании которых можно установить его личность и которые используются оператором для установления личности субъекта Данные).
                            </span>
                            <span>
                                7.8. Компания не осуществляет трансграничную передачу Данных.
                            </span>
                            <span>
                                7.9. Настоящая Политика является локальным нормативным актом Компании. Настоящая Политика является общедоступной. Общедоступность настоящей Политики обеспечивается публикацией на Сайте интернет-магазина согласно п.7.4. Настоящая Политика может быть пересмотрена в любом из следующих случаев: при изменении законодательства Российской Федерации в области обработки и защиты персональных данных; в случаях получения предписаний от компетентных государственных органов на устранение несоответствий, затрагивающих область действия Политики; по решению руководства Компании; при изменении целей и сроков обработки Данных; при изменении организационной структуры, структуры информационных и/или телекоммуникационных систем (или введении новых); при применении новых технологий обработки и защиты Данных (в т. ч. передачи, хранения); при появлении необходимости в изменении процесса обработки Данных, связанной с деятельностью Компании.
                            </span>
                        </div>
                    </div>
                </div>
                {/*<div>*/}
                {/*    <svg*/}
                {/*        className={styles.goBackMobile}*/}
                {/*        onClick={() => router.back()}*/}
                {/*        width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>*/}
                {/*        <path d='M25 14.125L3 14.125M3 14.125L9.875 21M3 14.125L9.875 7.25' stroke='#FF0000'*/}
                {/*              strokeWidth='2' strokeLinecap='square'/>*/}
                {/*    </svg>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Privacy;
