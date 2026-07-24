# frozen_string_literal: true

module Jekyll
  class StepperConverter
    def initialize(config)
      @config = config
    end

    def convert(content)
      lines = content.lines
      result = []
      i = 0

      while i < lines.length
        line = lines[i]
        match = line.match(/^(`{3,})(\S*)\s*$/)

        if match
          backtick_count = match[1].length
          info_string = match[2]

          if info_string == "stepper"
            block_lines = []
            i += 1
            closer = /^`{#{backtick_count}}\s*$/

            while i < lines.length
              break if lines[i].match(closer)
              block_lines << lines[i]
              i += 1
            end

            i += 1 if i < lines.length

            steps = parse_steps(block_lines.join)
            if steps.empty?
              result << "#{match[1]}stepper\n"
              result.concat(block_lines)
              result << "`" * backtick_count + "\n"
            else
              result << render_stepper(steps)
            end
          else
            result << line
            i += 1
            closer = /^`{#{backtick_count}}\s*$/

            while i < lines.length
              result << lines[i]
              break if lines[i].match(closer)
              i += 1
            end

            i += 1
          end
        else
          result << line
          i += 1
        end
      end

      result.join
    end

    private

    def parse_steps(content)
      steps = []
      current_title = nil
      current_content = []

      content.lines.each do |line|
        if (match = line.match(/^#\s+(.+)$/))
          steps << { title: current_title, content: current_content.join } if current_title
          current_title = match[1].strip
          current_content = []
        else
          current_content << line
        end
      end

      steps << { title: current_title, content: current_content.join } if current_title
      steps
    end

    def render_stepper(steps)
      step_count = steps.length
      html = %(<div class="stepper" data-steps="#{step_count}">\n)

      steps.each_with_index do |step, index|
        html << %(  <hr />\n) if index > 0
        html << %(  <details#{index.zero? ? " open" : ""}>\n)
        html << %(    <summary>#{step[:title]}</summary>\n)
        html << %(    <div class="stepper-content">\n)

        html << render_markdown(step[:content])

        html << %(    <div class="stepper-nav">\n)
        html << %(      <button class="stepper-prev"#{index.zero? ? " disabled" : ""}>\u2190 Pr\u00e9c\u00e9dent</button>\n)
        html << %(      <span class="stepper-progress">\u00c9tape #{index + 1} / #{step_count}</span>\n)
        html << %(      <button class="stepper-next"#{index == step_count - 1 ? " disabled" : ""}>Suivant \u2192</button>\n)
        html << %(    </div>\n)
        html << %(    </div>\n)
        html << %(  </details>\n)
      end

      html << %(</div>\n)
      html
    end

    def render_markdown(content)
      return "" if content.strip.empty?

      doc = Kramdown::Document.new(content, input: "GFM")
      doc.to_html
    end
  end
end

Jekyll::Hooks.register [:pages, :posts, :documents], :pre_render do |doc|
  converter = Jekyll::StepperConverter.new(doc.site.config)
  doc.content = converter.convert(doc.content)
end
