(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const INCLUDE_CLASSES = [
            'jenkins-breadcrumbs__list-item',
            'model-link',
            'empty-state-block',
            'task-link-text',
            'jenkins-command-palette__results__item',
            'jenkins-command-palette__results__item--hover',
            'jenkins-section__item'
        ];

        function isIncluded(node) {
            while (node) {
                if (node.nodeType === 1) { // Element
                    for (const className of INCLUDE_CLASSES) {
                        if (node.classList.contains(className)) {
                            return true;
                        }
                    }
                }
                node = node.parentNode;
            }
            return false;
        }

        function replaceText(node) {
            const walker = document.createTreeWalker(
                node,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: function (textNode) {
                        if (
                            textNode.nodeValue.includes("Jenkins") &&
                            isIncluded(textNode.parentNode)
                        ) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                        return NodeFilter.FILTER_SKIP;
                    }
                },
                false
            );

            while (walker.nextNode()) {
                walker.currentNode.nodeValue = walker.currentNode.nodeValue.replace(/Jenkins/g, "Anggle");
            }
        }

        // Aplicação inicial
        replaceText(document.body);

        // Observer para mudanças dinâmicas
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1 && isIncluded(node)) {
                        replaceText(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
})();
